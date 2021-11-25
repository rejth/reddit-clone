import React from 'react';
import styled from 'styled-components';
import useStore from '../../../store';

import SidebarCategoryList from './List';
import CreatePotButton from './Button';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 24px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  background-color: ${(props) => props.theme.foreground};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar: React.FC = () => {
  const user = useStore((s) => s.user);
  return (
    <Wrapper>
      {user && <CreatePotButton />}
      <SidebarCategoryList />
    </Wrapper>
  );
};

export default Sidebar;
