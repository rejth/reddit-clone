import React from 'react';
import styled from 'styled-components';

import { transition, wideFont } from '../../styles/helpers';

interface ILabelProps {
  readonly isActive: boolean;
}

const Label = styled.label<ILabelProps>`
  ${transition('color', 'background-color')};
  ${wideFont};

  display: block;
  flex: 1 1 100%;
  border: 1px solid ${(props) => props.theme.accent};
  width: 100%;
  padding: 8px;
  background: ${(props) => (props.isActive ? props.theme.accent : 'transparent')};
  cursor: pointer;
  text-align: center;
  color: ${(props) => (props.isActive ? '#ffffff' : props.theme.accent)};
  outline: 0;

  @media (hover: hover) {
    :hover {
      background: ${(props) => props.theme.accent};
      color: #ffffff;
    }
  }

  :first-of-type {
    border-radius: 3px 0 0 3px;
  }

  :last-of-type {
    border-radius: 0 3px 3px 0;
  }

  :not(:first-of-type) {
    border-left: 0;
  }
`;

const RadioGroupOption: React.FC = (props: any) => {
  const {
    value,
    label,
    isActive,
    onClick,
  } = props;

  return (
    <>
      <input
        type="radio"
        name="radiogroup"
        id={value}
        onChange={() => onClick(value)}
      />
      <Label
        htmlFor={value}
        isActive={isActive}
      >
        {label}
      </Label>
    </>
  );
};

export default RadioGroupOption;
