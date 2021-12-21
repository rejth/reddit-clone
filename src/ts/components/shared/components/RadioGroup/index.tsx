import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

import RadioGroupOption from './Option';

export const RadioGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  input[type='radio'] {
    display: none;
  }
`;

function handleClick(e: SyntheticEvent, value: any, fn: (value: any) => void) {
  e.preventDefault();
  fn(value);
}

const renderOptions = (field: any) => field.options.map((option: any) => (
  <RadioGroupOption
    {...option}
    key={option.id}
    isActive={field.input.value === option.value}
    onClick={(e: SyntheticEvent) => handleClick(e, option.value, field.input.onChange)}
  />
));

const RadioGroup: React.FC = ({ field }: any) => (
  <RadioGroupWrapper>{renderOptions(field)}</RadioGroupWrapper>
);

export default RadioGroup;
