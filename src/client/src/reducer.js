const initialState = {
  recipes: [],
  buttonState: true
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_BUTTON_STATE":
      return !state.buttonState;
    default:
      return state
  }
}

export default mainReducer;