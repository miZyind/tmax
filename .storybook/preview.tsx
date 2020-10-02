import { ThemeProvider } from 'styled-components';

import theme from '../theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
