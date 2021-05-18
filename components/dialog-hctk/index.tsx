import { useCallback, useContext, useRef, useState } from 'react';
import styled from 'styled-components';

import { Classes, Dialog } from '@blueprintjs/core';

import { DialogsContext, Name } from '#contexts/dialogs';
import { decode } from '#utils/hctk-decoder';
import { useCedict } from '#utils/swr';

import HeaderIcon from './header-icon';
import Input from './input';
import Output from './output';

const DIALOG = Name.HCTK;

function DialogHCTK({ className }: StyledProps) {
  const { state, dispatch } = useContext(DialogsContext);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cedict = useCedict();
  const output = decode(text, cedict);
  const isValidOutput = Boolean(output.length);

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={state[DIALOG]}
      onClose={useCallback(() => dispatch([DIALOG, false]), [dispatch])}
      onOpening={useCallback(() => inputRef.current?.focus(), [inputRef])}
      icon={<HeaderIcon />}
      title='HantChar to Keyboard Keys'
    >
      <div className={Classes.DIALOG_BODY}>
        <Input
          inputRef={inputRef}
          value={text}
          isValidOutput={isValidOutput}
          onChange={setText}
        />
        <Output value={output} isValidOutput={isValidOutput} />
      </div>
    </Dialog>
  );
}

export default styled(DialogHCTK)`
  padding: unset;
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};

  .${Classes.ICON} {
    pointer-events: none;
  }

  .${Classes.LABEL} {
    user-select: none;
    font-size: ${({ theme }) => theme.vars['$pt-font-size-large']};
  }

  .${Classes.POPOVER_CONTENT} {
    padding: 5px;
  }
`;
