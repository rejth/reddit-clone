import React from 'react';
import styled from 'styled-components';

import { wideFont } from '../../shared/styles/helpers';

const Header = styled.span`
  ${wideFont};

  display: block;
  padding: 12px;
  text-align: center;
  color: ${(props) => props.theme.mutedText};
`;

const SidebarCategoryListHeader: React.FC = () => {
  return <Header>Categories</Header>;
};

export default SidebarCategoryListHeader;
