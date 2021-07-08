import Head from 'next/head'
import '../components/global.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>{Component.title}</title>
                <meta name="description" content={Component.description} />
            </Head>
            <Component {...pageProps} />
        </>
    )
}