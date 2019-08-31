import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setRecipes } from './actions';

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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setRecipes: recipes => dispatch(setRecipes(recipes))
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    const { location, setRecipes } = this.props;
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

    // Load initial recipes from db
    const recipes = (await axios.get('/api/recipes')).data;
    setRecipes(recipes);
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
            render={() => <Recipes />} 
          />
          <SecuredRoute 
            exact 
            path='/recipes/create' 
            component={RecipeCreate}
            checkingSession={checkingSession}
          />
          <Route 
            exact 
            path='/recipes/view/:categoryKey/:key' 
            render={() => <Recipe />} 
          />
          <SecuredRoute 
            exact 
            path='/recipes/edit/:categoryKey/:key' 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));