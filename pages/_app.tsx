import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { SWRConfig } from 'swr';

import { Classes } from '@blueprintjs/core';

import theme from '#utils/theme';

import type { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; }
  .${Classes.OVERLAY}.${Classes.OVERLAY_SCROLL_CONTAINER} { overflow-x: hidden; }
`;
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Turbulent miZyind at Xion</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Component className={Classes.DARK} {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}
