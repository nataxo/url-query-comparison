import Head from 'next/head';
import Main from '../components/Main';

import '../components/global.css';

const IndexPage = () => (
    <div>
        <Head>
            <title>Compare Urls</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <meta
                name="description"
                content="Comparator for url query parameters. Use it for large urls."
            />
            <meta name="author" content="nataxo" />
            <link
                href="/static/favicon.ico"
                rel="shortcut icon"
                type="image/x-icon"
            />
        </Head>
        <Main />
    </div>
);

IndexPage.getInitialProps = ({query}) => {
    return {query};
};

export default IndexPage;
