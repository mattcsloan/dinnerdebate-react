import { connect } from 'react-redux';
import { createRecipe } from './../../actions';

import RecipeAdmin from './RecipeAdmin';

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdmin);