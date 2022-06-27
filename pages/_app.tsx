import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { SWRConfig } from 'swr';

import { Classes, FocusStyleManager } from '@blueprintjs/core';

import PageTransition from '#components/page-transition';
import Config from '#utils/config';
import { SITE_TITLE } from '#utils/constant';
import theme from '#utils/theme';

import type { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; -webkit-tap-highlight-color: transparent; }
  .${Classes.OVERLAY}.${Classes.OVERLAY_SCROLL_CONTAINER} { overflow-x: hidden; }
`;
const fetcher = (url: string) => fetch(url).then((response) => response.json());

FocusStyleManager.onlyShowFocusOnTabs();

export default function App({ Component, pageProps }: AppProps) {
  const { GA_ID } = Config;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{SITE_TITLE}</title>
        <meta name='description' content={SITE_TITLE} />
      </Head>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}');
        `}
      </Script>
      <GlobalStyle />
      <PageTransition />
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Component className={Classes.DARK} {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}
