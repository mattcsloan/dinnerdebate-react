const initialState = {
  recipes: [],
  title: ''
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.title
      };
    default:
      return state
  }
}

export default mainReducer;