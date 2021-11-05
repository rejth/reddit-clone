import React from 'react';
import styled from 'styled-components';

import HeaderLogo from './Logo';
import HeaderDarkButton from './DarkButton/DarkButton';
import HeaderNavLink from './NavLink';

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  height: 48px;
  padding: 0 10vw;
  user-select: none;
  background-color: ${(props) => props.theme.foreground};
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  border-bottom: 1px solid ${(props) => props.theme.border};

  @media (max-width: 425px) {
    margin-bottom: 16px;
    height: 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export default function Header(): JSX.Element {
  return (
    <Wrapper>
      <HeaderLogo />
      <HeaderDarkButton />
      <HeaderNavLink to="/login">Log in</HeaderNavLink>
      <HeaderNavLink to="/signup">Sign Up</HeaderNavLink>
    </Wrapper>
  );
}
