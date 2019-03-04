import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';

import './assets/styles/app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="wrapper">
          <Route exact path='/' component={Recipes} />
          <Route exact path='/recipes/:recipeId' component={Recipe} />
        </div>
      </div>
    );
  }
}

export default App;
