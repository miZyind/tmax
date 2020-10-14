import React, { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  Classes,
  Dialog,
  FormGroup,
  IDialogProps,
  Icon,
  InputGroup,
  Popover,
  Position,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { decode } from '#utils/hctk-decoder';

import HeaderIcon from './header-icon';

interface Props extends StyledProps {
  cedict: Cedict;
  isOpen: boolean;
  onClose: IDialogProps['onClose'];
}

const determineModifier = (isValidInput: boolean, isValidOutput: boolean) => {
  if (isValidInput) {
    if (isValidOutput) {
      return Classes.INTENT_SUCCESS;
    }

    return Classes.INTENT_DANGER;
  }

  return '';
};

const HCTK = ({ className, cedict, isOpen, onClose }: Props) => {
  const [text, setText] = useState('');
  const output = decode(text, cedict);
  const isValidInput = Boolean(text.length);
  const isValidOutput = Boolean(output.length);
  const inputClassName = determineModifier(isValidInput, isValidOutput);

  const handleOnInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value),
    [],
  );

  const handleOnOutputClick = useCallback((e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();

    return navigator.clipboard.writeText(e.currentTarget.value);
  }, []);

  return (
    <Dialog
      className={`${className} ${Classes.DARK}`}
      isOpen={isOpen}
      onClose={onClose}
      icon={<HeaderIcon />}
      title='HantChar to Keyboard Keys'
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup className='form-group' label='Input' labelFor='hctk-input'>
          <InputGroup
            value={text}
            id='hctk-input'
            leftIcon='translate'
            className={inputClassName}
            placeholder='Input HantChar...'
            onChange={handleOnInputChange}
            inputRef={(el) => isOpen && el?.focus()}
            large
          />
        </FormGroup>
        <FormGroup className='form-group' label='Output' labelFor='hctk-output'>
          <div className={`${Classes.INPUT_GROUP} ${Classes.LARGE}`}>
            <Icon className='output-icon' icon={IconNames.LOG_OUT} />
            <Popover
              content='Copied'
              usePortal={false}
              targetTagName='div'
              disabled={!isValidOutput}
              position={Position.BOTTOM_LEFT}
            >
              <input
                value={output}
                id='hctk-output'
                className={Classes.INPUT}
                disabled={!isValidOutput}
                onClick={handleOnOutputClick}
                placeholder='Output keyboard keys...'
                readOnly
              />
            </Popover>
          </div>
        </FormGroup>
      </div>
    </Dialog>
  );
};

export default styled(HCTK)`
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

  #hctk-output {
    cursor: copy;
    padding-left: ${({ theme }) => theme.vars['$pt-input-height-large']};

    &:disabled {
      cursor: default;
    }
  }
`;
