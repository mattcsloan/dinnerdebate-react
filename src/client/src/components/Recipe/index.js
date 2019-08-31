import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setRecipe } from './../../actions';

import Recipe from './Recipe';

const mapStateToProps = (state, ownProps) => {
  const { match: { params }, location} = ownProps;

  console.log("ownProps", ownProps);
  let recipe = null;
  // if(location.state && location.state.recipeId) {
  if(location && location.state && location.state.recipeId) {
    recipe = state.recipes.find(recipe => recipe._id === location.state.recipeId);
  }
  return ({
    recipe
  })
};

const mapDispatchToProps = dispatch => ({
  setRecipe: recipe => dispatch(setRecipe(recipe))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe));