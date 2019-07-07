import { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import TextField from '../components/TextField';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import Table from '../components/Table';
import { compareQueryParamsInUrls } from '../helpers/url';
import Footer from '../components/Footer';

import {global, page} from './styles';

const FIRST_URL_PLACEHOLDER = "first.com?alpha=1&beta=2";
const SECOND_URL_PLACEHOLDER = "second.com?beta=3&gamma=2";
const IGNORE_PLACEHOLDER = 'beta,zetta';

export default () => {
    const [firstUrl, setFirstUrl] = useState('');
    const [secondUrl, setSecondUrl] = useState('');
    const [ignore, setIgnore] = useState('');
    const [difference, setDifference] = useState([]);
    const [equal, setEqual] = useState([]);

    const reset = () => {
        setFirstUrl('');
        setSecondUrl('');
    };

    const compare = () => {
        let ignoreParams = '';

        try {
            localStorage.setItem('ignoreParams', ignore);
            ignoreParams = ignore.replace(' ', '').split(',');
        } catch (e) { }

        const { diff, eq } = compareQueryParamsInUrls(firstUrl, secondUrl, ignoreParams);
        setDifference(diff);
        setEqual(eq);
    };

    useEffect(() => {
        try {
            setIgnore(localStorage.getItem('ignoreParams') || '')
        } catch (e) { }
    }, []);

    useEffect(() => {
        const onKeyDown = function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                compare();
            }
        };
        window.addEventListener('keydown', onKeyDown);

        return function unsubscribe() {
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    return (
        <Fragment>
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
                        label="First Url"
                        value={firstUrl}
                        onChange={setFirstUrl}
                        placeholder={FIRST_URL_PLACEHOLDER}
                    />
                    <TextField
                        label="Second Url"
                        value={secondUrl}
                        onChange={setSecondUrl}
                        placeholder={SECOND_URL_PLACEHOLDER}
                    />
                    <TextField
                        label="Ignore params"
                        value={ignore}
                        onChange={setIgnore}
                        placeholder={IGNORE_PLACEHOLDER}
                        rows={1}
                    />

                    <div className="buttonGroup">
                        <Button type="submit" onClick={compare}>Compare</Button>
                        <Button type="reset" onClick={reset}>Clean</Button>
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

                <style jsx global>{global}</style>
                <style jsx>{page}</style>
            </main>
            <Footer />
        </Fragment>
    );
}
