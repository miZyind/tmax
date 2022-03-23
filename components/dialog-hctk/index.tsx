import { useCallback, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

import { Classes, Colors, Dialog } from '@blueprintjs/core';

import HeaderIcon from '#components/dialog-hctk/header-icon';
import Input from '#components/dialog-hctk/input';
import Output from '#components/dialog-hctk/output';
import { DialogsContext, Name } from '#contexts/dialogs';
import { decode } from '#utils/hctk-decoder';

const DIALOG = Name.HCTK;

function DialogHCTK({ className }: StyledProps) {
  const { state, dispatch } = useContext(DialogsContext);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cedict = useSWR<Cedict>('/cedict.json', {
    revalidateOnFocus: false,
  }).data;
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
  background-color: ${Colors.DARK_GRAY4};
  .${Classes.ICON} {
    pointer-events: none;
  }
  .${Classes.LABEL} {
    font-size: 16px;
    user-select: none;
  }
`;
