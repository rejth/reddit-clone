import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import PostList from './PostList';
import PostDetails from './PostDetails';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const HomeMainSection = styled.main`
  flex: 1;
  min-width: 0;
`;

const Home: React.FC = () => (
  <Wrapper>
    <HomeMainSection>
      <Switch>
        <Route
          path="/categories/:category"
          component={PostList}
        />
        <Route
          path="/categories/:category/:postId"
          component={PostDetails}
        />
        <Route
          path="/user/:username"
          component={PostList}
        />
        <Route
          path="/"
          component={PostList}
        />
      </Switch>
    </HomeMainSection>
    <Route component={Sidebar} />
  </Wrapper>
);

export default Home;
