import {Diff, Eq} from '../types';

type QueryParamsMap = {
    [key: string]: {
        hash: string,
        values: string[],
    },
};

export const getQueryParams = (href: string, ignoreParams: string[] = []): QueryParamsMap => {
    if (!href) {
        return {};
    }

    const search = href.replace(/^.*\?/, '?').replace(/#.*$/, '');

    /** search string is missing */
    if (search === href || !search) {
        return {};
    }

    const searchParams = new URLSearchParams(search);

    ignoreParams.forEach(name => searchParams.delete(name));

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

export const compareQueryParamsInUrls = (firstHref: string, secondHref: string, ignoreParams: string[]) => {
    const firstParams = getQueryParams(firstHref, ignoreParams);
    const secondParams = getQueryParams(secondHref, ignoreParams);

    const diff: Diff[] = [];
    const eq: Eq[] = [];

    Object.entries(firstParams).forEach(([key, {values, hash}]) => {
        if (Object.prototype.hasOwnProperty.call(secondParams, key)) {
            if (hash === secondParams[key].hash) {
                eq.push([key, values]);
            } else {
                diff.push([key, values, secondParams[key].values]);
            }

            delete secondParams[key];
        } else {
            diff.push([key, values, null]);
        }
    });

    Object.entries(secondParams).forEach(([key, {values}]) => {
        diff.push([key, null, values]);
    });

    return { diff, eq };
};