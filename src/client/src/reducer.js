const initialState = {
  recipes: [],
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.recipes
      };
      case "SET_RECIPE":
        return {
          ...state,
          recipes: [
            ...state.recipes,
            action.recipe
          ]
        };
      case "CREATE_RECIPE":
        return {
          ...state,
          recipes: [
            ...state.recipes,
            action.recipe
          ]
        };
      case "UPDATE_RECIPE":
        const recipeToUpdate = state.recipes.findIndex(recipe => recipe._id === action.id);
        return {
          ...state,
          recipes: [
            ...state.recipes.slice(0,recipeToUpdate),
            action.recipe,
            ...state.recipes.slice(recipeToUpdate+1)
          ]
        };
      default:
        return state
  }
}

export default mainReducer;