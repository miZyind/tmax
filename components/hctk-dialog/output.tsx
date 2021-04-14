import clsx from 'classnames';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Classes, FormGroup, Icon, Popover, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import type { MouseEvent } from 'react';

interface Props extends StyledProps {
  value: string;
  isValidOutput: boolean;
}

function Output({ className, value, isValidOutput }: Props) {
  const onClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.currentTarget.select();

      return navigator.clipboard.writeText(value);
    },
    [value],
  );
  const targetProps = {
    id: 'hctk-output',
    className: clsx(className, Classes.INPUT),
    placeholder: 'Output keyboard keys...',
    value,
    onClick,
    readOnly: true,
    disabled: !isValidOutput,
  };

  return (
    <FormGroup label='Output' labelFor='hctk-output'>
      <div className={clsx(Classes.INPUT_GROUP, Classes.LARGE)}>
        <Icon icon={IconNames.LOG_OUT} />
        <Popover
          position={Position.BOTTOM_LEFT}
          target={<input {...targetProps} />}
          targetTagName='div'
          content='Copied!'
          usePortal={false}
          disabled={!isValidOutput}
        />
      </div>
    </FormGroup>
  );
}

export default styled(Output)`
  cursor: copy;
  padding-left: ${({ theme }) => theme.vars['$pt-input-height-large']};

  &:disabled {
    cursor: default;
  }
`;
