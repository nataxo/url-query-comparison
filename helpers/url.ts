import UrlParser from 'url-parse';
import {Diff, Eq} from '../types';

export const getQueryParams = (href: string, ignoreParams: string[] = []) => {
    const url = new UrlParser(href, true);

    return Object
        .entries(url.query)
        .reduce<{[a: string]: string}>((acc, [key, value]) => {
            if (!ignoreParams.includes(key) && typeof value === 'string') {
                acc[key] = value;
            }

            return acc;
        }, {});
};

export const compareQueryParamsInUrls = (firstHref: string, secondHref: string, ignoreParams: string[] = []) => {
    const firstParams = getQueryParams(firstHref, ignoreParams);
    const secondParams = getQueryParams(secondHref, ignoreParams);

    const diff: Diff[] = [];
    const eq: Eq[] = [];

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
