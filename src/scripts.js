//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css'
import {fetchUserData, fetchRecipesData, fetchIngredientsData} from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/search-icon.png'
// import { currentRecipe } from './data/data-model.js'
import { allContainer, currentRecipes, displayRecipes, viewRecipes, viewSearchResults, homeButton, showHome, showUserPage, deleteRecipe,
  categoriesContainer, selectRecipe, searchRecipes, viewRecipe, showFilteredRecipes, saveButton, createRandomUser, userButton, saveRecipe, backButton, savedRecipes, userSearchIcon, userSearchInput, userRecipes, backFilteredRecipes, searchInput } from './domUpdates.js'

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

let globalUserData;
let globalRecipesData;
let globalIngredientsData;

window.addEventListener('load',fetchData)

function fetchData() {
  Promise.all([fetchUserData(), fetchRecipesData(), fetchIngredientsData()])
    .then((responses) => {
     console.log('usersData', responses[0].users)
     console.log('responses', responses[0].users[0].name)
     console.log('recipeData', responses[1].recipes)
     console.log('ingredientsData', responses[2].ingredients)
     
       // All data is fetched and global variables are updated
      //use the api response data
    globalUserData = responses[0].users
    globalRecipesData = responses[1].recipes
    globalIngredientsData = responses[2].ingredients

      // manipulate data or update UI here.
      // call functions that update the DOM to display the recipes or other.
      //update what you need to wtih the data

    createRandomUser()
    // displayRecipes()
    })
    .catch(error => console.error('Error:', error));
};

// export {
//   globalRecipesData
// }