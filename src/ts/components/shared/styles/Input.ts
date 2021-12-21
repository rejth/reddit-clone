import styled from 'styled-components';
import { transition } from './helpers';

interface IInputProps {
  error?: boolean;
  theme: any;
}

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type,
  placeholder: props.placeholder,
  defaultValue: props.defaultValue,
})) <IInputProps>`
  ${transition('border', 'box-shadow')};

  --border: ${(props) => (props.error ? props.theme.error : props.theme.accent)};
  --shadow: ${(props) => (props.error ? `${props.theme.error}4d` : `${props.theme.accent}4d`)};

  display: block;
  ${(props) => (props.error
    ? 'border: 1px solid var(--border)'
    : `border: 1px solid ${props.theme.border}`)};
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  font-size: 15px;
  color: ${(props) => props.theme.normalText};
  appearance: none;
  outline: none;
  resize: vertical;
  margin-bottom: 5px;

  :hover,
  :focus {
    border: 1px solid var(--border);
  }

  :focus {
    box-shadow: 0 0 0 2px var(--shadow);
  }
`;

export default Input;
