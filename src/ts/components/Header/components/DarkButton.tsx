import React from 'react';
import styled from 'styled-components';

import useStore from '../../../store';
import { headerItem } from '../../shared/styles/helpers';

import HeaderDarkButtonIcon from './Icon';

const DarkButton = styled.span`
  ${headerItem};

  padding: 0 8px;
  cursor: pointer;

  @media (hover: hover) {
    :hover path {
      fill: ${(props) => props.theme.accent};
    }
  }
`;

const HeaderDarkButton: React.FC = () => {
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <DarkButton onClick={() => toggleTheme()}>
      <HeaderDarkButtonIcon />
    </DarkButton>
  );
};

export default HeaderDarkButton;
