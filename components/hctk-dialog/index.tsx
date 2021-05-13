import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import { Classes, Dialog } from '@blueprintjs/core';

import { decode } from '#utils/hctk-decoder';

import HeaderIcon from './header-icon';
import Input from './input';
import Output from './output';

import type { DialogProps } from '@blueprintjs/core';

interface Props extends StyledProps {
  isOpen: boolean;
  onClose: DialogProps['onClose'];
}

function HCTKDialog({ className, isOpen, onClose }: Props) {
  const [text, setText] = useState('');
  const output = decode(text);
  const isValidOutput = Boolean(output.length);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDialogOpening = useCallback(
    () => inputRef.current?.focus(),
    [inputRef],
  );

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={isOpen}
      onClose={onClose}
      onOpening={handleDialogOpening}
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

export default styled(HCTKDialog)`
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
