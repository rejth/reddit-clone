import React from 'react';
import styled from 'styled-components';

import HeaderNavLink from '../styles/NavLink';
import { wideFont } from '../../shared/styles/helpers';

interface HeaderUsernameButtonProps {
  username: string;
}

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid ${(props) => props.theme.border};
  border-right: 1px solid ${(props) => props.theme.border};
  min-width: 0;
`;

const HeaderUsernameText = styled.span`
  ${wideFont};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.mutedText};
`;

const HeaderUsernameButton: React.FC<HeaderUsernameButtonProps> = ({ username }) => (
  <Wrapper to={`/user/${username}`}>
    <HeaderUsernameText>{username}</HeaderUsernameText>
  </Wrapper>
);

export default HeaderUsernameButton;
