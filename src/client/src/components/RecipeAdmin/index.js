import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setRecipe, createRecipe, updateRecipe, deleteRecipe } from './../../actions';

import RecipeAdmin from './RecipeAdmin';

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  let recipeMatch = null;
  if(location && location.state && location.state.recipeId) {
    recipeMatch = state.recipes.find(recipe => recipe && recipe._id === location.state.recipeId);
  }
  return ({
    recipe: recipeMatch
  })  
};

const mapDispatchToProps = dispatch => ({
  setRecipe: recipe => dispatch(setRecipe(recipe)),
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  updateRecipe: (recipe, id) => dispatch(updateRecipe(recipe, id)),
  deleteRecipe: id => dispatch(deleteRecipe(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeAdmin));