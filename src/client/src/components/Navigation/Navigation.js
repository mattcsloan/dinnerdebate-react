import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Authentication';

function Navigation(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navigation">
      <div className="wrapper">
        <Link to="/">
          Recipes
        </Link>
        {!auth0Client.isAuthenticated() &&
          <a onClick={auth0Client.signIn}>Sign In</a>
        }
        {auth0Client.isAuthenticated() &&
          <div>
            <label>{auth0Client.getProfile().name}</label>
            <a onClick={() => {signOut()}}>Sign Out</a>
          </div>
        }
      </div>
    </nav>
  );
}

export default withRouter(Navigation);
