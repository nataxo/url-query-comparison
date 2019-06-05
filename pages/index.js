import {useState, useEffect} from 'react';
import Head from 'next/head';
import TextField from '../components/TextField';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import Table from '../components/Table';
import {compareUrls} from '../helpers/url';

function GlobalStyles() {
    return (
        <style jsx global>{`
            * {
                box-sizing: border-box;
                font-size: 14px;
                font-family: Helvetica, Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            
            ::selection {
                background-color: #79FFE1;
            }

            html, body {
                width: 100vw;
                overflow-x: hidden;
                padding: 0;
                margin: 0;
            }    
        `}</style>
    );
}

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
        localStorage.setItem('ignoreParams', ignore);
        const ignoreParams = ignore.replace(' ', '').split(',');
        const [diff, eq] = compareUrls(firstUrl, secondUrl, ignoreParams);
        setDifference(diff);
        setEqual(eq);
    };

    useEffect(() =>
        window && window.localStorage && setIgnore(window.localStorage.getItem('ignoreParams') || '' ),
        []
    );

    useEffect(() => {
        const onKeyDown = function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                compare();
            }
        };
        window.addEventListener('keydown', onKeyDown);

        return function unsubscribe() {
            window.removeEventListener('keydown', onKeyDown);
        }
    });

    return (
        <main>
            <Head>
                <title>Url Query Comparison</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1" />
            </Head>
            <Snippet>
                <TextField
                    label="First Url"
                    value={firstUrl}
                    onChange={setFirstUrl}
                />
                <TextField
                    label="Second Url"
                    value={secondUrl}
                    onChange={setSecondUrl}
                />
                <TextField
                    label="Ignore params"
                    value={ignore}
                    onChange={setIgnore}
                    placeholder={'param1, param2, ...'}
                    rows={1}
                />

                <div className="buttonGroup">
                    <Button type="submit" onClick={compare}>Compare</Button>
                    <Button type="reset" onClick={reset}>Clean</Button>
                </div>
            </Snippet>

            <Snippet>
                <h4>Difference</h4>
                { !difference.length ? <div className="info">No differences</div> :
                    <Table titles={['Param', 'First Url', 'Second Url']} values={difference}/>
                }
            </Snippet>

            {Boolean(equal.length) &&
                <Snippet>
                    <h4>Equal</h4>
                    <Table titles={['Param', 'Value']} values={equal} />
                </Snippet>
            }

            <GlobalStyles />
            <style jsx>{`
                main {
                    display: flex;
                    flex-direction: column;
                
                    padding: 24px;
                    max-width: 100%;
                }
                
                h4 {
                    font-weight: bold;
                    font-size: 18px;
                    margin-bottom: 8px;
                    margin-top: 0;
                }
     
                .buttonGroup {
                    display: flex;
                    margin-top: 24px;
                }
                
                .info {
                    color: #666;
                }
                
                @media screen and (max-width: 599px) {
                    main {
                        padding: 12px 8px;
                        width: 100%;
                        overflow-x: hidden;
                    }
                    
                    .buttonGroup {
                        margin-top: 16px;
                    }
                }
            `}</style>
        </main>
    );
}
