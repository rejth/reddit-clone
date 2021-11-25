import React from 'react';
import styled from 'styled-components';

import NavLink from '../../shared/styles/NavLink';

interface CategoryListProps {
  category: string;
}

const Item = styled(NavLink)`
  padding: 12px;
  font-size: 15px;
  text-decoration: none;
  color: ${(props) => props.theme.normalText};

  ::after {
    left: -1px;
    top: 0;
    bottom: 0;
    border-left: 3px solid ${(props) => props.theme.accent};
  }
`;

const SidebarCategoryListItem: React.FC<CategoryListProps> = ({ category }) => {
  const isAll = category === 'all';

  return (
    <Item exact={isAll} to={isAll ? '/' : `/categories/${category}`}>
      {category}
    </Item>
  );
};

export default SidebarCategoryListItem;
