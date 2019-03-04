import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="wrapper">
        <Link to="/">
          Recipes
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;