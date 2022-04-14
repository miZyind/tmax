import '@blueprintjs/core';

import type { ReactNode } from 'react';

declare module '@blueprintjs/core' {
  interface IProps {
    children?: ReactNode;
  }
}
