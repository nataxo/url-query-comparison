import Document, {Head, Main, NextScript} from 'next/document';
import {getStyles} from 'reshadow';

const mapStyles = styles => Object
    .entries(styles)
    .map(([id, code]) => (
        <style id={id} dangerouslySetInnerHTML={{__html: code}} key={id} />
    ));

export default class MyDocument extends Document {
    static async getInitialProps({renderPage}) {
        const page = renderPage();
        const style = getStyles();
        return {...page, style};
    }

    render() {
        return (
            <html>
                <Head>
                    {mapStyles(this.props.style.map)}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
};
