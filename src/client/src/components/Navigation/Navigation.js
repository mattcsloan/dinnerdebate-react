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
        <div className="nav-block">
          <Link to="/">
            Recipes
          </Link>
          <Link to="/recipes/create">
            Create
          </Link>
        </div>
        <div className="nav-block">
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
      </div>
    </nav>
  );
}

export default withRouter(Navigation);
