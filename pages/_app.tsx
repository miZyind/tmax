import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import {
  StyleSheetManager,
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { SWRConfig } from 'swr';

import {
  BlueprintProvider,
  Classes,
  FocusStyleManager,
} from '@blueprintjs/core';

import PageTransition from '#component/page-transition';
import Config from '#lib/config';
import { SITE_TITLE, SITE_URL } from '#lib/constant';
import fetcher from '#lib/fetcher';
import theme from '#lib/theme';

import type { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; -webkit-tap-highlight-color: transparent; }
  .${Classes.OVERLAY}.${Classes.OVERLAY_SCROLL_CONTAINER} { overflow-x: hidden; }
`;
const shouldForwardProp = () => true;

FocusStyleManager.onlyShowFocusOnTabs();

export default function App({ Component, pageProps }: AppProps) {
  const { GA_ID } = Config;
  const { asPath } = useRouter();
  // Strip query and hash so the http, www and ?dialog= variants all point to the same https canonical URL.
  const canonicalUrl = `${SITE_URL}${asPath.split(/[?#]/u)[0]}`;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{SITE_TITLE}</title>
        <meta name='description' content={SITE_TITLE} />
        <link rel='canonical' href={canonicalUrl} />
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
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <PageTransition />
        <ThemeProvider theme={theme}>
          <SWRConfig value={{ fetcher }}>
            <BlueprintProvider>
              <Component className={Classes.DARK} {...pageProps} />
            </BlueprintProvider>
          </SWRConfig>
        </ThemeProvider>
      </StyleSheetManager>
    </>
  );
}
