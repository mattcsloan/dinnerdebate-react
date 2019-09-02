import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setRecipes } from './../../actions';

import Recipes from './Recipes';

const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
  setRecipes: recipes => dispatch(setRecipes(recipes))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes));