import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from './pages/auth/LoginPage';
import './App.css';
import ArticleList from './pages/article/ArticleList';
import PrivateRoute from './PrivateRoute';
import ArticleDetail from './pages/article/ArticleDetail';

function App() {
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = user && user.logged_in;
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/articles" component={ArticleList} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path="/articles/:id" component={ArticleDetail} isLoggedIn={isLoggedIn} />

        {/* <PrivateRoute path='/likes' component={PostFeed} isLoggedIn={isLoggedIn} />
        <PrivateRoute exact path='/new' component={PostCreate} isLoggedIn={isLoggedIn} />
        <Route path='/login' component={AuthPage} />
        <Route path='/sign-up' component={AuthPage} />
        <Route exact path='/:id/edit' component={PostEdit} />
        <Route exact path='/:id' component={PostDetail} />
        <Route path='/user/:username' component={UserPostFeed} /> */}
      </Switch>
    </div>
  );
}

export default App;
