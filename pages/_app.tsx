import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import env from '#configs/env';
import { SettingsProvider } from '#contexts/settings';
import theme from '#theme';

import type { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1'
        />
        <title>{env.title}</title>
      </Head>
      <GlobalStyle />
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SettingsProvider>
    </>
  );
}
