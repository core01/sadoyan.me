import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
