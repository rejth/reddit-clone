import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { headerItem } from '../../shared/styles/helpers';

const Logo = styled(Link)`
  ${headerItem};

  margin-right: auto;
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.normalText};
  text-decoration: none;

  @media (max-width: 425px) {
    padding: 0 8px 0 16px;
    font-size: 19px;
  }
`;

const HeaderLogo: React.FC = () => <Logo to="/">Reddit</Logo>;

export default HeaderLogo;
