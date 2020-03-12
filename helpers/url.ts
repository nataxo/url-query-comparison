import {Diff, Eq} from '../types';

type ComparisonResult = {diff: Diff[], eq: Eq[]};

type QueryParamsMap = {
    [key: string]: {
        hash: string,
        values: string[],
    },
};

type UrlParams = {
    origin: string,
    pathname: string,
    searchParams: URLSearchParams,
};

type NonQueryUrlParams = Omit<UrlParams, 'searchParams'>;

export const getQueryParamsMap = (urlSearchParams: URLSearchParams): QueryParamsMap => {
    const searchParams = new URLSearchParams(urlSearchParams);

    const searchParamsMap: QueryParamsMap = {};

    searchParams.forEach((val, name) => {
        if (name in searchParamsMap) {
            searchParamsMap[name].values.push(val);
        } else {
            searchParamsMap[name] = {hash: '', values: [val]};
        }
    });

    Object.values(searchParamsMap).forEach(entry => {
        entry.values.sort();
        entry.hash = entry.values.join('_@_')
    });
    return searchParamsMap;
};

export const parseUrl = (
    href: string,
    ignoreParams: string[] = []
): UrlParams => {
    let url: Partial<UrlParams>;

    try {
        url = new URL(href);
    } catch (err) {
        const origin = href.replace(/\?.*$/, '');
        const search = href.replace(origin, '').replace(/#.*$/, '') || '';

        url = {origin, pathname: '', searchParams: new URLSearchParams(search)};
    }

    const {
        origin = '',
        pathname = '',
        searchParams = new URLSearchParams(),
    } = url;

    ignoreParams.forEach(name => searchParams.delete(name));

    return {origin, pathname, searchParams};

};

export const compareQueryParams = (
    firstParams: QueryParamsMap,
    secondParams: QueryParamsMap
): ComparisonResult => {
    const diff: Diff[] = [];
    const eq: Eq[] = [];
    // compare query params
    Object.entries(firstParams).forEach(([key, {values, hash}]) => {
        if (Object.prototype.hasOwnProperty.call(secondParams, key)) {
            const secondParam = secondParams[key];
            if (!secondParam || secondParam.hash !== hash ) {
                diff.push([key, values, secondParam.values]);
            } else {
                eq.push([key, values]);
            }

            if (secondParam) {
                delete secondParams[key];
            }
        } else {
            diff.push([key, values, null]);
        }
    });

    // push unequal query params from second url
    Object.entries(secondParams).forEach(([key, {values}]) => {
        diff.push([key, null, values]);
    });

    return { diff, eq };
};

export const compareNonQueryUrlParams = (
    firsUrl: NonQueryUrlParams,
    secondUrl: NonQueryUrlParams
): ComparisonResult => {
    const diff: Diff[] = [];
    const eq: Eq[] = [];
    // compare rest url params
    Object.entries(firsUrl).forEach(([key, value]) => {
        const secondValue = secondUrl[key];

        if (value === '' && secondValue === '') {
            return;
        }

        if (value === secondValue) {
            eq.push([`url ${key}`, [value]]);
            return;
        }

        diff.push([`url ${key}`, [value], [secondValue]]);
    });
    return { diff, eq };
};
    

export const compareUrls = (firstHref: string, secondHref: string = '', ignoreParams: string[] = []): ComparisonResult => {
    const { searchParams: firstSearchParams, ...firsUrl } = parseUrl(firstHref, ignoreParams);
    const { searchParams: secondSearchParams, ...secondUrl } = parseUrl(secondHref, ignoreParams);
    const firstParams = firstSearchParams ? getQueryParamsMap(firstSearchParams) : {};
    const secondParams = secondSearchParams ? getQueryParamsMap(secondSearchParams) : {};

    const { eq: nonQueryEq, diff: nonQueryDiff } = compareNonQueryUrlParams(firsUrl, secondUrl);
    const { eq: queryEq, diff: queryDiff } = compareQueryParams(firstParams, secondParams);

    return {
        eq: [
            ...nonQueryEq,
            ...queryEq,
        ],
        diff: [
            ...nonQueryDiff,
            ...queryDiff,
        ],
    };
};
