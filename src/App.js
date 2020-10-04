import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoginPage from './pages/auth/LoginPage';
import './App.css';
import ArticleList from './pages/article/ArticleList';
import PrivateRoute from './PrivateRoute';
import ArticleDetail from './pages/article/ArticleDetail';
import ArticleCreate from './pages/article/ArticleCreate';
import ArticleEdit from './pages/article/ArticleEdit';
import { logout } from './modules/auth';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isLoggedIn = user && user.logged_in;

  const onLogout = () => {
    dispatch(logout(user));
  };
  // Todo: check Redirect
  return (
    <div className="App">
      {isLoggedIn && (
        <button id="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/articles" component={ArticleList} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path="/articles/create" component={ArticleCreate} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path="/articles/:id" component={ArticleDetail} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path="/articles/:id/edit" component={ArticleEdit} isLoggedIn={isLoggedIn} />
      </Switch>
    </div>
  );
}

export default App;
