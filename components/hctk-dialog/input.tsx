import classNames from 'classnames';
import { useCallback } from 'react';

import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';

import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  isValidOutput: boolean;
  onChange: (value: string) => void;
}

export default function Input({ value, isValidOutput, onChange }: Props) {
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
        // eslint-disable-next-line react/jsx-no-bind
        inputRef={(el) => el?.focus()}
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
