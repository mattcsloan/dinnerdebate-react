export const updateTitle = title => {
  return {
   type: 'UPDATE_TITLE',
   title
  }
 }

 export const setRecipes = recipes => {
  return {
   type: 'SET_RECIPES',
   recipes
  }
 }

 export const setRecipe = recipe => {
  return {
   type: 'SET_RECIPE',
   recipe
  }
 }

 export const createRecipe = recipe => {
  return {
   type: 'CREATE_RECIPE',
   recipe
  }
 }