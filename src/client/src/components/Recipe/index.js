import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setRecipe } from './../../actions';

import Recipe from './Recipe';

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
  setRecipe: recipe => dispatch(setRecipe(recipe))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe));