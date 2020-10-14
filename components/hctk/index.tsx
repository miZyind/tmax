import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  IDialogProps,
  IInputGroupProps,
  Icon,
  InputGroup,
  Spinner,
} from '@blueprintjs/core';

import { decode } from '#utils/hctk-decoder';

import HeaderIcon from './header-icon';

interface Props extends StyledProps {
  cedict: Cedict;
  isOpen: boolean;
  onClose: IDialogProps['onClose'];
}

function HCTK({ className, cedict, isOpen, onClose }: Props) {
  const [input, setInput] = useState('');
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    [],
  );
  const inputProps: IInputGroupProps = { onChange };

  if (input.length) {
    inputProps.rightElement = <Spinner size={Icon.SIZE_STANDARD} />;
  }

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={isOpen}
      onClose={onClose}
      icon={<HeaderIcon />}
      title='HantChar to Keyboard'
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label='Input' labelFor='hctk-input'>
          <InputGroup
            id='hctk-input'
            leftIcon='translate'
            placeholder='Input HantChar...'
            value={input}
            {...inputProps}
          />
        </FormGroup>
        <FormGroup label='Output' labelFor='hctk-output'>
          <InputGroup
            id='hctk-output'
            leftIcon='log-out'
            value={decode(input, cedict)}
            rightElement={<Button icon='clipboard' />}
          />
        </FormGroup>
      </div>
    </Dialog>
  );
}

export default styled(HCTK)`
  padding: unset;
  background-color: ${({ theme }) => theme.vars['$dark-gray4']};
`;
