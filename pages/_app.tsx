import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { SWRConfig } from 'swr';

import { Classes } from '@blueprintjs/core';

import env from '#configs/env';
import theme from '#theme';
import { fetcher } from '#utils/swr';

import type { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; }
  .${Classes.OVERLAY}.${Classes.OVERLAY_SCROLL_CONTAINER} { overflow-x: hidden; }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{env.title}</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}
