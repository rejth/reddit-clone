import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import HeaderLogo from './Logo';
import HeaderDarkButton from './DarkButton/DarkButton';
import HeaderNavLink from './NavLink';
import HeaderUsernameButton from './UsernameButton/UsernameButton';

import useStore from '../../store';
import { logOutUser } from '../../../services/redditService';

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

const Header: React.FC = () => {
  const [user, resetUser]: any = useStore((s) => [s.user, s.resetUser], shallow);

  const history = useHistory();
  const mutation = useMutation(logOutUser, {
    onSuccess: () => {
      resetUser();
      history.push('/login');
      toast.success('Logged out successful!', { duration: 5000, icon: '👋' });
    },
    onError: () => {
      toast.error('Error logged out', { duration: 5000, icon: '🤢' });
    },
  });

  return (
    <Wrapper>
      <HeaderLogo />
      <HeaderDarkButton />
      {user ? (
        <>
          <HeaderUsernameButton username={user.username} />
          <HeaderNavLink to="/logout" onClick={() => mutation.mutate()}>
            Log out
          </HeaderNavLink>
        </>
      ) : (
        <>
          <HeaderNavLink to="/login">Log in</HeaderNavLink>
          <HeaderNavLink to="/signup">Sign Up</HeaderNavLink>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
