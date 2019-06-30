import UrlParser from 'url-parse';

export const getQueryParams = (href, ignoreParams = []) => {
    const url = new UrlParser(href, true);

    return Object.entries(url.query).reduce((acc, [key, value]) => {
        if (!ignoreParams.includes(key)) {
            acc[key] = value;
        }

        return acc;
    }, {});
};

export const compareQueryParamsInUrls = (firstHref, secondHref, ignoreParams = []) => {
    const firstParams = getQueryParams(firstHref, ignoreParams);
    const secondParams = getQueryParams(secondHref, ignoreParams);

    const diff = [];
    const eq = [];

    Object.entries(firstParams).forEach(([key, value]) => {
        if (secondParams.hasOwnProperty(key)) {
            if (secondParams[key] === firstParams[key]) {
                eq.push([key, value]);
            } else {
                diff.push([key, value, secondParams[key]]);
            }

            delete secondParams[key];
        } else {
            diff.push([key, value, null]);
        }
    });

    Object.entries(secondParams).forEach(([key, value]) => {
        diff.push([key, null, value]);
    });

    return {diff, eq};
};
