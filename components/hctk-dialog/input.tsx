import classNames from 'classnames';
import { useCallback } from 'react';

import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';

import type { IInputGroupProps } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

interface Props {
  inputRef: IInputGroupProps['inputRef'];
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
  const className = classNames({ [modifier]: value.length });
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
