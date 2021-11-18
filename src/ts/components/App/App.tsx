import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import Header from '../Header';

import useStore from '../../store';
import { useAuthUser } from '../../../services/redditService';

const App: React.FC = () => {
  useAuthUser();
  const user = useStore((state) => state.user);
  console.log('user: ', user);
  return (
    <>
      <Route component={Header} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
};

export default App;
