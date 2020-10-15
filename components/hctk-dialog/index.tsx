import { useState } from 'react';
import styled from 'styled-components';

import { Classes, Dialog } from '@blueprintjs/core';

import { decode } from '#utils/hctk-decoder';

import HeaderIcon from './header-icon';
import Input from './input';
import Output from './output';

import type { IDialogProps } from '@blueprintjs/core';
interface Props extends StyledProps {
  cedict: Cedict;
  isOpen: boolean;
  onClose: IDialogProps['onClose'];
}

function HCTKDialog({ className, cedict, isOpen, onClose }: Props) {
  const [text, setText] = useState('');
  const output = decode(text, cedict);
  const isValidOutput = Boolean(output.length);

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={isOpen}
      onClose={onClose}
      icon={<HeaderIcon />}
      title='HantChar to Keyboard Keys'
    >
      <div className={Classes.DIALOG_BODY}>
        <Input value={text} isValidOutput={isValidOutput} onChange={setText} />
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
