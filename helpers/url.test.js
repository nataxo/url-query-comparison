import { compareQueryParams, parseUrl, getQueryParamsMap, compareUrls} from './url';

describe('getQueryParamsMap', () => {
    it('should return a query params map', () => {
        const expected = getQueryParamsMap(new URLSearchParams('?a=1&a=9&a=1'));
        const actual = {
            a: {
                hash: '1_@_1_@_9',
                values: ['1', '1', '9'],
            },
        };
        expect(expected).toStrictEqual(actual);
    });
});

describe('compareQueryParams', () => {
    describe('if passed equal query params maps', () => {
        it('should return eq array and empty diff array', () => {
            const firsQueryMap = {
                a: {
                    hash: '1',
                    values: ['1'],
                },
            };

            const secondQueryMap = {
                a: {
                    hash: '1',
                    values: ['1'],
                },
            };
            const expected = compareQueryParams(firsQueryMap, secondQueryMap);
            const actual = {
                diff: [],
                eq: [['a', ['1']]],
            };

            expect(expected).toStrictEqual(actual);
        });
    });

    describe('if passed maps with equal keys, but unequal values', () => {
        it('should return diff array', () => {
            const firsQueryMap = {
                a: {
                    hash: '1_@_2',
                    values: ['1', '2'],
                },
            };

            const secondQueryMap = {
                a: {
                    hash: '2',
                    values: ['2'],
                },
            };
            const expected = compareQueryParams(firsQueryMap, secondQueryMap);
            const actual = {
                diff: [
                    ['a', ['1', '2'], ['2']],
                ],
                eq: [],
            };

            expect(expected).toStrictEqual(actual);
        });
    });

    describe('if passed maps with different keys and values', () => {
        it('should return diff array', () => {
            const firsQueryMap = {
                a: {
                    hash: '1',
                    values: ['1'],
                },
            };

            const secondQueryMap = {
                b: {
                    hash: '1',
                    values: ['1'],
                },
            };
            const expected = compareQueryParams(firsQueryMap, secondQueryMap);
            const actual = {
                diff: [
                    ['a', ['1'], null],
                    ['b', null, ['1']],
                ],
                eq: [],
            };

            expect(expected).toStrictEqual(actual);
        });
    });
});

describe('parseUrl', () => {
    it('should parse url without protocol', () => {
        expect(parseUrl('//github.com?a=1')).toEqual({
            origin: '//github.com',
            pathname: '',
            searchParams: new URLSearchParams('?a=1'),
        });
    });

    it('should parse url without query params', () => {
        expect(parseUrl('https://github.com/path')).toStrictEqual({
            origin: 'https://github.com',
            pathname: '/path',
            searchParams: new URLSearchParams(),
        });
    });

    it('should return empty URL if passed empty string', () => {
        expect(parseUrl('')).toStrictEqual({
            origin: '',
            pathname: '',
            searchParams: new URLSearchParams(),
        });
    });

    it('should exclude passed ignore params from the output searchParams', () => {
        const expected = parseUrl('https://github.com?a=1', ['a']);
        expect(expected).toStrictEqual(
            expect.objectContaining({
                searchParams: new URLSearchParams(),
            }));
    });
});

describe('compareUrls', () => {
    it('should compare url origins', () => {
        const expected = compareUrls('https://github.com?a=1', 'http://github.com?a=1');
        const actual = {
            diff: [
                ['Url origin', ['https://github.com'], ['http://github.com']],
            ],
            eq: [
                ['Url pathname', ['/']],
                ['a', ['1']],
            ],
        };

        expect(expected).toStrictEqual(expect.objectContaining(actual));
    });

    it('should return diff array for unequal multi parameter', () => {
        const expected = compareUrls('https://github.com?a=1&a=2', 'http://github.com?a=1&a=3')

        expect(expected).toEqual(expect.objectContaining({
            diff: expect.arrayContaining([
                ['a', ['1', '2'], ['1', '3']],
            ]),
        }));
    });

    it('should return eq array for equal multi parameter', () => {
        const expected = compareUrls('https://github.com?a=1&a=2', 'http://github.com?a=1&a=2');

        expect(expected).toEqual(expect.objectContaining({
            eq: expect.arrayContaining([
                ['a', ['1', '2']],
            ]),
        }));
    });

    it('should return comparison result for single url', () => {
        const expected = compareUrls('https://github.com?a=1', '');
        const actual = {
            diff: [
                ['Url origin', ['https://github.com'], ['']],
                ['Url pathname', ['/'], ['']],
                ['a', ['1'], null],
            ],
            eq: [],
        };

        expect(expected).toStrictEqual(actual);
    });
});