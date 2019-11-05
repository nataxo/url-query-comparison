import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import UrlParser from 'url-parse';
import {compareQueryParamsInUrls} from '../../helpers/url';
import {Diff, Eq} from '../../types';
import View from './view';

const compare = (first: string, second: string, ignore: string) => {
    const ignoreValue = ignore != undefined ? ignore : '';
    const ignoreParams = ignoreValue
        .trim()
        .replace(' ', '')
        .split(',');

    try {
        localStorage.setItem('ignoreParams', ignoreValue);
    } catch (e) { }

    return compareQueryParamsInUrls(
        first.trim(),
        second.trim(),
        ignoreParams,
    );
};

const Main = () => {
    const [firstUrl, setFirstUrl] = useState('');
    const [secondUrl, setSecondUrl] = useState('');
    const [ignoreParams, setIgnoreParams] = useState('');
    const [difference, setDifference] = useState<Diff[]>([]);
    const [equal, setEqual] = useState<Eq[]>([]);
    const router = useRouter();

    const changeAppState = ({first = '', second = '', ignore = ''}) => {
        const ignoreParams =
            ignore || localStorage.getItem('ignoreParams') || '';
        const { diff, eq } = compare(first, second, ignoreParams);

        setFirstUrl(first);
        setSecondUrl(second);
        setIgnoreParams(ignoreParams);
        setDifference(diff);
        setEqual(eq);
    };

    useEffect(() => {
        // init app state
        changeAppState(router.query);

        const handleRouteChange = (url: string) => {
            const {query} = new UrlParser(url, true);
            changeAppState(query);
        };

        router.events && router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events && router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    const changeQueryParams = (query = {}) => {
        router.push({pathname: '/', query});
    };

    const onReset = () => {
        changeQueryParams();
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        changeQueryParams({
            first: firstUrl,
            second: secondUrl,
            ignore: ignoreParams,
        });
    };

    return (
        <View
            firstUrl={firstUrl}
            secondUrl={secondUrl}
            ignoreParams={ignoreParams}
            equal={equal}
            difference={difference}
            onFirstUrlChange={setFirstUrl}
            onSecondUrlChange={setSecondUrl}
            onIgnoreParamsChange={setIgnoreParams}
            onSubmit={onSubmit}
            onReset={onReset}
        />
    );
};

export default Main;
