import React from 'react';
import { Route } from 'react-router-dom';
import auth0Client from '../Authentication';

function SecuredRoute(props) {
  const { component: Component, path, checkingSession } = props;

  return (
    <Route path={path} render={() => {
      if (checkingSession) return <div>Validating session...</div>;
      if (!auth0Client.isAuthenticated()) {
        auth0Client.signIn();
        return <div>You do not have access to this page. Please sign-in.</div>;
      }
      return <Component />
    }} />
  );
}

export default SecuredRoute;