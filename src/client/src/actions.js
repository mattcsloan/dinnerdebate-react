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

 export const updateRecipe = (recipe, id) => {
  return {
   type: 'UPDATE_RECIPE',
   id,
   recipe
  }
 }

 export const deleteRecipe = id => {
  return {
   type: 'DELETE_RECIPE',
   id
  }
 }