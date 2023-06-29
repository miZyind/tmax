import clsx from 'classnames';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Classes, FormGroup, Icon, Popover } from '@blueprintjs/core';
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

  return (
    <FormGroup className={className} label='Output' labelFor='hctk-output'>
      <div className={clsx(Classes.INPUT_GROUP, Classes.LARGE)}>
        <Icon icon={IconNames.LOG_OUT} />
        <Popover
          fill
          content='Copied!'
          usePortal={false}
          placement='left'
          disabled={!isValidOutput}
        >
          <input
            readOnly
            value={value}
            id='hctk-output'
            onClick={onClick}
            disabled={!isValidOutput}
            className={Classes.INPUT}
            placeholder='Output keyboard keys...'
          />
        </Popover>
      </div>
    </FormGroup>
  );
}

export default styled(Output)`
  input {
    cursor: copy;
    padding-left: 40px;
    &:disabled {
      cursor: default;
    }
  }
  .${Classes.POPOVER_CONTENT} {
    padding: 5px;
    user-select: none;
  }
`;
