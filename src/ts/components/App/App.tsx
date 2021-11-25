import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import Header from '../Header';
import Home from '../../pages/Home';
import CreatePost from '../../pages/CreatePost';

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
        <Route path="/create" component={CreatePost} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
