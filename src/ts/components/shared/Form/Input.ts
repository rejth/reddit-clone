import styled from 'styled-components';
import { transition } from '../helpers';

interface IInput {
  error: boolean;
  theme: any;
}

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Input = styled.input`
  ${transition('border', 'box-shadow')};

  --border: ${(props: IInput) => (props.error ? props.theme.error : props.theme.accent)};
  --shadow: ${(props: IInput) =>
    props.error ? `${props.theme.error}4d` : `${props.theme.accent}4d`};

  display: block;
  ${(props: IInput) =>
    props.error
      ? `
    border: 1px solid var(--border)
    `
      : `
    border: 1px solid ${props.theme.border}
  `};
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  background-color: ${(props: IInput) => props.theme.inputBackground};
  font-size: 15px;
  color: ${(props: IInput) => props.theme.normalText};
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
