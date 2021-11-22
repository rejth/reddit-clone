import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import Header from '../Header';

import { useAuthUser } from '../../../services/redditService';

const App: React.FC = () => {
  useAuthUser();
  return (
    <>
      <Route component={Header} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
};

export default App;
