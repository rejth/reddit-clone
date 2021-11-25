import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../shared/styles/Button';

const CreatePostButton = styled(Button)`
  border-radius: 2px 2px 0 0;
  padding: 16px;
  text-decoration: none;
  text-align: center;
`;

const SidebarCreatePostButton: React.FC = () => {
  return (
    <CreatePostButton as={Link} to="/create">
      Create post
    </CreatePostButton>
  );
};

export default SidebarCreatePostButton;
