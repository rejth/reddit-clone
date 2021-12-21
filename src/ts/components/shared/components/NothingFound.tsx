import React from 'react';
import styled from 'styled-components';

import { smallFont } from '../styles/helpers';

const Wrapper = styled.div`
  ${smallFont};

  ${(props: any) => props.comments && 'margin-top: 16px'};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  padding: 48px 0;
  background-color: ${(props) => props.theme.foreground};
  text-align: center;
  color: ${(props) => props.theme.mutedText};

  @media (max-width: 768px) {
    ${(props: any) => !props.comments && 'margin-top: -1px'};
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const NothingFound: React.FC<any> = ({ text }: any): JSX.Element => {
  const message = text || "There's nothing here...";
  return <Wrapper>{message}</Wrapper>;
};

export default NothingFound;
