import { useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';

import { Classes, Dialog } from '@blueprintjs/core';

import { DialogsContext, Name } from '#contexts/dialogs';

import HeaderIcon from './header-icon';

const DIALOG = Name.Analytics;

function DialogAnalytics({ className }: StyledProps) {
  const { state, dispatch } = useContext(DialogsContext);
  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={state[DIALOG]}
      onClose={useCallback(() => dispatch([DIALOG, false]), [dispatch])}
      icon={<HeaderIcon />}
      title='Analytics'
    >
      <div className={Classes.DIALOG_BODY}>
        <canvas ref={canvas} />
      </div>
    </Dialog>
  );
}

export default styled(DialogAnalytics)`
  padding: unset;
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};

  .${Classes.ICON} {
    pointer-events: none;
  }
`;
