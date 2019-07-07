import {compareQueryParamsInUrls, getQueryParams} from './url';

describe('getQueryParams', () => {
    describe('if url has a protocol', () => {
        it('should return an object with query params', () => {
            expect(getQueryParams('https://github.com?a=1')).toStrictEqual({a: '1'});
        });
    });
    describe('if url has not a protocol', () => {
        it('should return an object with query params', () => {
            expect(getQueryParams('//github.com?a=1')).toStrictEqual({a: '1'});
        });
    });
    describe('if url has not query params', () => {
        it('should return an empty object', () => {
            expect(getQueryParams('https://github.com')).toStrictEqual({});
        });
    });
    describe('if the function gets array with ignore parameters', () => {
        it('should return an object without them', () => {
            expect(getQueryParams('https://github.com?a=1', ['a'])).toStrictEqual({});
        });
    });
});

describe('compareQueryParamsInUrls', () => {
    describe('if the function gets equal urls', () => {
        it('should return empty diff and one element in eq', () => {
            const expected = compareQueryParamsInUrls('https://github.com?a=1', 'https://github.com?a=1');
            const actual = {
                diff: [],
                eq: [['a', '1']],
            };

            expect(expected).toStrictEqual(actual);
        });
    });

    describe('if the function gets equal urls and all params from urls in ignoreParams', () => {
        it('should return empty arrays', () => {
            const expected = compareQueryParamsInUrls('https://github.com?a=1', 'https://github.com?a=1', ['a']);
            const actual = {
                diff: [],
                eq: [],
            };

            expect(expected).toStrictEqual(actual);
        });
    });

    describe('if the function gets different urls and key params are equal', () => {
        it('should return diff array with different values', () => {
            const expected = compareQueryParamsInUrls('https://github.com?a=1', 'https://github.com?a=2');
            const actual = {
                diff: [
                    ['a', '1', '2'],
                ],
                eq: [],
            };

            expect(expected).toStrictEqual(actual);
        });
    });

    describe('if the function gets different urls and key params are not equal', () => {
        it('should return diff array with different keys and values', () => {
            const expected = compareQueryParamsInUrls('https://github.com?a=1', 'https://github.com?b=1');
            const actual = {
                diff: [
                    ['a', '1', null],
                    ['b', null, '1'],
                ],
                eq: [],
            };

            expect(expected).toStrictEqual(actual);
        });
    });

    describe('if the function gets different urls and all params in ignoreParams', () => {
        it('should return an empty diff array', () => {
            const expected = compareQueryParamsInUrls(
                'https://github.com?a=1',
                'https://github.com?b=1',
                ['a', 'b']
            );
            const actual = {
                diff: [],
                eq: [],
            };

            expect(expected).toStrictEqual(actual);
        });
    });
});