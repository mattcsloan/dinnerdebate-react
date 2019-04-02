import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from './components/Authentication';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import RecipeCreate from './components/RecipeCreate';
import RecipeEdit from './components/RecipeEdit';

import './assets/styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    const { checkingSession } = this.state;
    return (
      <div>
        <Navigation />
        <div className="wrapper">
          <Route
            exact
            path='/' 
            component={Recipes} 
          />
          <SecuredRoute 
            exact 
            path='/recipes/create' 
            component={RecipeCreate}
            checkingSession={checkingSession}
          />
          <Route 
            exact 
            path='/recipes/view/:recipeId' 
            component={Recipe} 
          />
          <SecuredRoute 
            exact 
            path='/recipes/edit/:recipeId' 
            component={RecipeEdit} 
            checkingSession={checkingSession}
          />
          <Route 
            exact 
            path='/callback' 
            component={Callback} 
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);