import React, { useMemo } from 'react';
import styled from 'styled-components';

import SidebarCategoryListHeader from './Header';
import SidebarCategoryListItem from './Item';

const CategoryList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SidebarCategoryList: React.FC = () => {
  const categories = useMemo(
    () => ['programming', 'news', 'videos', 'fashion', 'music', 'funny'],
    [],
  );

  return (
    <CategoryList>
      <SidebarCategoryListHeader />
      {['all', ...categories].map((category: string) => (
        <SidebarCategoryListItem key={category} category={category} />
      ))}
    </CategoryList>
  );
};

export default SidebarCategoryList;
