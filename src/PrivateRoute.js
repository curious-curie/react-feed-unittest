import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
