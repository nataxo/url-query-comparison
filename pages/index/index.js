import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter, Router } from 'next/router';
import UrlParser from 'url-parse';
import styled from 'reshadow';

import TextField from '../../components/TextField';
import Snippet from '../../components/Snippet';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { compareQueryParamsInUrls } from '../../helpers/url';
import Footer from '../../components/Footer';

import styles from './styles.css';
import global from './global.css';

const FIRST_URL_PLACEHOLDER = "first.com?alpha=1&beta=2";
const SECOND_URL_PLACEHOLDER = "second.com?beta=3&gamma=2";
const IGNORE_PLACEHOLDER = 'beta,zetta';

const IndexPage = () => {
    const router = useRouter();

    const [firstUrl, setFirstUrl] = useState('');
    const [secondUrl, setSecondUrl] = useState('');
    const [ignoreParams, setIgnoreParams] = useState('');
    const [difference, setDifference] = useState([]);
    const [equal, setEqual] = useState([]);

    const compare = (first, second, ignore) => {
        const ignoreValue = ignore != undefined ? ignore : '';
        const ignoreParams = ignoreValue.replace(' ', '').split(',');

        try {
            localStorage.setItem('ignoreParams', ignoreValue);
        } catch (e) {}

        const { diff, eq } = compareQueryParamsInUrls(first, second, ignoreParams);
        setDifference(diff);
        setEqual(eq);
    };

    const changeAppState = ({first = '', second = '', ignore = ''}) => {
        setFirstUrl(first);
        setSecondUrl(second);

        let ignoreParams = '';

        if (ignore) {
            setIgnoreParams(ignore);
        } else {
            try {
                ignoreParams = localStorage.getItem('ignoreParams');
            } catch (e) {}

            setIgnoreParams(ignoreParams)
        }

        if (first && second) {
            compare(first, second, ignore || ignoreParams);
        }
    };


    useEffect(() => {
        changeAppState(router.query);
    }, []);

    useEffect(() => {
        const onKeyDown = function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                compare(firstUrl, secondUrl, ignoreParams);
                changeQueryParams({
                    first: firstUrl,
                    second: secondUrl,
                    ignore: ignoreParams,
                });
            }
        };
        window.addEventListener('keydown', onKeyDown);

        return function unsubscribe() {
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    useEffect(() => {
        const handleRouteChange = url => {
            const {query} = new UrlParser(url, true);
            changeAppState(query);
        };

        Router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, []);

    const changeQueryParams = (query = {}) => {
        router.push({
            pathname: '/',
            query,
        });
    };

    const onReset = () => {
        setFirstUrl('');
        setSecondUrl('');
        setIgnoreParams('');
        changeQueryParams();
    };

    const onSubmit = e => {
        e.preventDefault();

        compare(firstUrl, secondUrl, ignoreParams);
        changeQueryParams({
            first: firstUrl,
            second: secondUrl,
            ignore: ignoreParams,
        });
    };

    return styled(styles)(
        <>
            <main>
                <Head>
                    <title>Compare Urls</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1" />
                    <meta name="description" content="Comparator for url query parameters. Use it for large urls." />
                    <meta name="author" content="nataxo" />
                    <link href="/static/favicon.ico" rel="shortcut icon" type="image/x-icon" />
                </Head>
                <h1>Compare Urls</h1>
                <Snippet>
                    <TextField
                        id="first-url"
                        label="First Url"
                        value={firstUrl}
                        onChange={setFirstUrl}
                        placeholder={FIRST_URL_PLACEHOLDER}
                    />
                    <TextField
                        id="second-url"
                        label="Second Url"
                        value={secondUrl}
                        onChange={setSecondUrl}
                        placeholder={SECOND_URL_PLACEHOLDER}
                    />
                    <TextField
                        id="ignore-params"
                        label="Ignore params"
                        value={ignoreParams}
                        onChange={setIgnoreParams}
                        placeholder={IGNORE_PLACEHOLDER}
                        rows={1}
                    />

                    <div className={styles.buttonGroup}>
                        <Button type="submit" onClick={onSubmit}>Compare</Button>
                        <Button type="reset" onClick={onReset}>Clean</Button>
                    </div>
                </Snippet>

                <Snippet>
                    <h2>Difference</h2>
                    {difference.length > 0
                        ? <Table titles={['Param', 'First Url', 'Second Url']} values={difference} />
                        : <div className="info">No differences</div>
                    }
                </Snippet>

                {equal.length > 0 && (
                    <Snippet>
                        <h2>Equal</h2>
                        <Table titles={['Param', 'Value']} values={equal} />
                    </Snippet>
                )}
            </main>
            <Footer />
        </>
    );
};

IndexPage.getInitialProps = ({query}) => {
    return {query};
};

export default IndexPage;
