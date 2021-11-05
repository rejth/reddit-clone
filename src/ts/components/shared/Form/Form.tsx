import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from '../LoadingIndicator';
import { transition } from '../helpers';

interface IForm {
  wide: boolean | undefined;
  theme: any;
}

const FormWrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid ${(props: IForm) => props.theme.border};
  border-radius: 2px;
  max-width: ${(props: IForm) => (props.wide ? '600px' : '375px')};
  padding: 24px;
  background-color: ${(props: IForm) => props.theme.foreground};

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: ${(props: IForm) => (props.wide ? '600px' : '375px')}) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const StyledForm = styled.form`
  ${transition('filter')};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${(props: any) =>
    props.isLoading && 'filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none'};
`;

const Form = ({ isLoading, wide, ...props }: any) => (
  <FormWrapper wide={wide}>
    <StyledForm {...props} />
    {isLoading && <LoadingIndicator />}
  </FormWrapper>
);

export default Form;
