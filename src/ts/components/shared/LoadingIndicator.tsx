import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${spin} 1s infinite linear;
  border: 0.3rem solid ${(props) => `${props.theme.accent}4d`};
  border-top-color: ${(props) => props.theme.accent};
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

const Wrapper = styled.div`
  position: relative;
  margin: 48px auto 0;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  width: 72px;
  height: 72px;
  background-color: ${(props) => props.theme.foreground};
`;

export default function LoadingIndicator() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
