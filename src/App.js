import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import './App.scss';

import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';
import PostList from './components/PostList';
import NewPost from './components/NewPost';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={`/`} exact component={Login} />
        <ProtectedRoute path={`/posts`} exact component={PostList} />
        <ProtectedRoute path={`/posts/new`} exact component={NewPost} />
      </Switch>
    </Router>
  );
}

export default App;
