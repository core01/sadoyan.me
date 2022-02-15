import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" initial-scale="1" />
                    <meta name="description" content="Roman Sadoyan - Frontend-developer from Saint-Petersburg" />
                    <meta property="og:url" content="https://sadoyan.me" />
                    <meta property="og:title" content="Roman Sadoyan" />
                    <meta property="og:description" content="Roman Sadoyan - Frontend-developer from Saint-Petersburg" />
                    <meta property="og:image" content="https://sadoyan.me/photo.jpg" />
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180x" href="/apple-touch-icon.png" />
                    <link rel="apple-touch-icon" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="apple-touch-icon" sizes="16x16" href="/favicon-16x16.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument