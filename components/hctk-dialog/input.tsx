import clsx from 'classnames';
import { useCallback } from 'react';

import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';

import type { ChangeEvent } from 'react';
import type { InputGroupProps2 } from '@blueprintjs/core';

interface Props {
  inputRef: InputGroupProps2['inputRef'];
  value: string;
  isValidOutput: boolean;
  onChange: (value: string) => void;
}

export default function Input({
  inputRef,
  value,
  isValidOutput,
  onChange,
}: Props) {
  const modifier = isValidOutput
    ? Classes.INTENT_SUCCESS
    : Classes.INTENT_DANGER;
  const className = clsx({ [modifier]: value.length });
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <FormGroup label='Input' labelFor='hctk-input'>
      <InputGroup
        inputRef={inputRef}
        id='hctk-input'
        className={className}
        placeholder='Input HantChar...'
        value={value}
        leftIcon='translate'
        onChange={handleOnChange}
        large
      />
    </FormGroup>
  );
}
