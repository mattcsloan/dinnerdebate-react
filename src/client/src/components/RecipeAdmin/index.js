import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setRecipe, createRecipe, updateRecipe } from './../../actions';

import RecipeAdmin from './RecipeAdmin';

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  let recipe = null;
  if(location && location.state && location.state.recipeId) {
    recipe = state.recipes.find(recipe => recipe._id === location.state.recipeId);
  }
  return ({
    recipe
  })
};

const mapDispatchToProps = dispatch => ({
  setRecipe: recipe => dispatch(setRecipe(recipe)),
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  updateRecipe: (recipe, id) => dispatch(updateRecipe(recipe, id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeAdmin));