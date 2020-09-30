import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from './pages/auth/LoginPage';
import './App.css';
import ArticleList from './pages/article/ArticleList';
import PrivateRoute from './PrivateRoute';
import ArticleDetail from './pages/article/ArticleDetail';
import ArticleCreate from './pages/article/ArticleCreate';

function App() {
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = user && user.logged_in;
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/articles" component={ArticleList} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path="/articles/create" component={ArticleCreate} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path="/articles/:id" component={ArticleDetail} isLoggedIn={isLoggedIn} />
      </Switch>
    </div>
  );
}

export default App;
