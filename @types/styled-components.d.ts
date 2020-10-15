import 'styled-components';

import type { Theme } from '#theme';

declare global {
  interface StyledProps {
    className?: string;
  }
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
