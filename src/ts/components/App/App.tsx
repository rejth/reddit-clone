import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import Header from '../Header';

const App: React.FC = (): JSX.Element => (
  <>
    <Route component={Header} />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </>
);

export default App;
