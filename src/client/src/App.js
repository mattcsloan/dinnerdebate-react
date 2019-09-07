import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';
import auth0Client from './components/Authentication';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import RecipeAdmin from './components/RecipeAdmin';

import './assets/styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    const { location } = this.props;
    if (location.pathname === '/callback') {
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
      <>
        <Navigation />
        <Route
          exact
          path='/' 
          component={Recipes} 
        />
        <SecuredRoute 
          exact 
          path='/recipes/create' 
          component={RecipeAdmin}
          checkingSession={checkingSession}
        />
        <Route 
          exact 
          path='/recipes/view/:categoryKey/:key' 
          component={Recipe} 
        />
        <SecuredRoute 
          exact 
          path='/recipes/edit/:categoryKey/:key' 
          component={RecipeAdmin} 
          checkingSession={checkingSession}
        />
        <Route 
          exact 
          path='/callback' 
          component={Callback} 
        />
      </>
    );
  }
}

export default withRouter(App);