//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css'
import { fetchPromises }  from './apiCalls.js'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/search-icon.png'
// import { currentRecipe } from './data/data-model.js'
import { allContainer, currentRecipes, displayRecipes, viewRecipes, viewSearchResults, homeButton, showHome, showUserPage, deleteRecipe,
  categoriesContainer, selectRecipe, searchRecipes, viewRecipe, showFilteredRecipes, saveButton, createRandomUser, userButton, saveRecipe, backButton, savedRecipes, userSearchIcon, userSearchInput, userRecipes, backFilteredRecipes, searchInput } from './domUpdates.js'
  
  let usersData;
  let globalRecipesData;
  let globalIngredientsData;
// EVENT LISTENERS //

viewSearchResults.addEventListener('click', () => {
  searchRecipes(currentRecipes, searchInput, allContainer)
  showFilteredRecipes()
})
userButton.addEventListener('click', showUserPage)
homeButton.addEventListener('click', showHome)
// window.addEventListener('load',() => {
//   fetchData,
//   createRandomUser
// })

categoriesContainer.addEventListener('click', viewRecipes);
allContainer.addEventListener('click', selectRecipe)
saveButton.addEventListener('click', saveRecipe)
backButton.addEventListener('click', backFilteredRecipes)
userRecipes.addEventListener('click', selectRecipe)

userSearchIcon.addEventListener('click', () => {
  searchRecipes(savedRecipes, userSearchInput, userRecipes)
})

//with test data, make everything work with this first
// let globalUserData = recipeData;
// let globalRecipesData = usersData;
// let globalIngredientsData = ingredientsData;

//once that works get rid of the test data and use the api data instead. start it empty instead.


window.addEventListener('load', () => {
  fetchPromises().then(data => {
    usersData = data[0].users;
    globalRecipesData = data[1].recipes;
    globalIngredientsData = data[2].ingredients;
    createRandomUser(usersData);
    // viewRecipes(globalRecipesData);
  })
})



// export {
//   globalRecipesData
// }