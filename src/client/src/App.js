import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import RecipeCreate from './components/RecipeCreate';
import RecipeEdit from './components/RecipeEdit';

import './assets/styles/app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="wrapper">
          <Route exact path='/' component={Recipes} />
          <SecuredRoute exact path='/recipes/create' component={RecipeCreate} />
          <Route exact path='/recipes/view/:recipeId' component={Recipe} />
          <Route exact path='/recipes/edit/:recipeId' component={RecipeEdit} />
          <Route exact path='/callback' component={Callback} />
        </div>
      </div>
    );
  }
}

export default App;
