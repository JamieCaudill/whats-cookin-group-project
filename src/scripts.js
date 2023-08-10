// SCRIPTS //

// IMPORTS //

import './styles.css';
import './images/food-panorama.jpg';
import './images/turing-logo.png';
import './images/search-icon.png';
import './images/chef-icon.png';

import { 
  fetchRecipes, 
  fetchIngredients, 
  fetchUsers 
} from './apiCalls';

  import { 
  allContainer, 
  viewRecipes, 
  viewSearchResults, 
  homeButton, 
  showHome, 
  showUserPage,
  categoriesContainer, 
  selectRecipe, 
  searchRecipes, 
  showFilteredRecipes, 
  saveButton, 
  createRandomUser,
  userButton, 
  saveTheRecipe, 
  displayRecipes, 
  backButton, 
  savedRecipes, 
  userSearchIcon, 
  userSearchInput, 
  userRecipes, 
  backFilteredRecipes, 
  searchInput, 
  userBackButton, 
  hide,
  displayRecipesToCook, 
  recipePrint, 
  createPrinterRecipe,
  loading 
} from './domUpdates.js';

// FETCHED DATA //

let recipeData = [];
let ingredientsData = [];
let usersData = [];
let currentUser = {};

window.addEventListener('load', () => {
  loading(currentUser);
  Promise.all([fetchRecipes, fetchIngredients, fetchUsers])
  .then(responses => {
    responses.forEach(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            if (response.url.includes('/recipes')) {
              recipeData = data.recipes;
            } else if (response.url.includes('/ingredients')) {
              ingredientsData = data.ingredients;
            } else if (response.url.includes('/users')) {
              usersData = data.users;
              currentUser = createRandomUser(usersData)
              console.log(currentUser)
              displayRecipesToCook(currentUser, recipeData, savedRecipes)
            }
          })
          .catch(error => {
            console.error('Error parsing response:', error);
          });
      } else {
        alert(`${response.status} server request failed, try again later`)
        console.error('Request failed with status:', response.status);
      }
    });
  });
});

// EVENT LISTENERS //

viewSearchResults.addEventListener('click', () => {
  searchRecipes(recipeData, searchInput, allContainer)
  showFilteredRecipes()
});

searchInput.addEventListener('keypress', function(event) {
  if(event.key === 'Enter') {
    searchRecipes(recipeData, searchInput, allContainer)
    showFilteredRecipes()
  }
})

userSearchIcon.addEventListener('click', () => {
  searchRecipes(savedRecipes, userSearchInput, userRecipes)
});

userSearchInput.addEventListener('keypress', function(event) {
  if(event.key === 'Enter') {
    searchRecipes(savedRecipes, userSearchInput, userRecipes)
  }
})

userBackButton.addEventListener('click', () => {
  displayRecipes(savedRecipes, userRecipes);
  hide([userBackButton]);
});

userButton.addEventListener('click', showUserPage);
homeButton.addEventListener('click', showHome);
categoriesContainer.addEventListener('click', viewRecipes);
allContainer.addEventListener('click', selectRecipe);
saveButton.addEventListener('click', () => {
  saveTheRecipe()
});
backButton.addEventListener('click', backFilteredRecipes);
userRecipes.addEventListener('click', selectRecipe);
recipePrint.addEventListener('click', createPrinterRecipe);


// EXPORTS //

export { 
  recipeData, 
  ingredientsData, 
  usersData, 
  currentUser
};