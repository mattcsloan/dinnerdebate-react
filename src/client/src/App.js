import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Route exact path='/' component={ Recipes } />
        <Route exact path='/recipes/:recipeId' component={Recipe } />
      </div>
    );
  }
}

export default App;
