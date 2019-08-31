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
      default:
        return state
  }
}

export default mainReducer;