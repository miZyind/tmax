import 'styled-components';

import { Theme } from '#theme';

declare global {
  interface StyledProps {
    className?: string;
  }
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
