import clsx from 'classnames';
import { useCallback } from 'react';

import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';

import type { ChangeEvent } from 'react';
import type { InputGroupProps } from '@blueprintjs/core';

interface Props {
  inputRef: InputGroupProps['inputRef'];
  value: string;
  isValidOutput: boolean;
  onChange: (value: string) => void;
}

export default function Input({
  inputRef,
  value,
  isValidOutput,
  onChange: onChangeRef,
}: Props) {
  const modifier = isValidOutput
    ? Classes.INTENT_SUCCESS
    : Classes.INTENT_DANGER;
  const className = clsx({ [modifier]: value.length });
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChangeRef(e.target.value),
    [onChangeRef],
  );

  return (
    <FormGroup label='Input' labelFor='hctk-input'>
      <InputGroup
        inputRef={inputRef}
        id='hctk-input'
        className={className}
        placeholder='Input HantChar...'
        value={value}
        leftIcon='log-in'
        onChange={onChange}
        large
      />
    </FormGroup>
  );
}
