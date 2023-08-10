// DOM MANIPULATION //

// IMPORTS //

import { filterRecipes } from "./functions/filter-recipes.js";
import { makeCurrentRecipe } from "./functions/current-recipe.js";
import { recipeIngredients } from "./functions/recipe-ingredients.js";
import { recipeData, ingredientsData, currentUser } from './scripts';
import { saveRecipe } from './functions/save-recipe.js';
import { deleteRecipe } from './functions/delete-recipe.js';
import { postSavedRecipe } from "./apiCalls.js";

// QUERY SELECTORS //

const viewAll = document.querySelector('.categories__all');
const allSection = document.querySelector('.all');
const userSection = document.querySelector('.user');
const categoriesSection = document.querySelector('.categories');
const categoriesContainer = document.querySelector('.categories__container');
const viewSearchResults = document.querySelector('.home__searchIcon');
const searchInput = document.querySelector('.home__searchInput');
const allContainer = document.querySelector('.all__container');
const allHeader = document.querySelector('.all__header');
const recipeSection = document.querySelector('.recipe');
const recipeTitle = document.querySelector('.recipe__title');
const imageContainer = document.querySelector('.image__container');
const ingredientsDisplay = document.querySelector('.recipe__ingredients');
const instructionsDisplay = document.querySelector('.recipe__instructions');
const recipeCost = document.querySelector('.recipe__cost')
const homeButton = document.querySelector('.home__button')
const saveButton = document.querySelector('.recipe__sbutton');
const userButton = document.querySelector('.home__ubutton');
const userName = document.querySelector('.user__name');
const userRecipes = document.querySelector('.user__recipes');
const backButton = document.querySelector('.recipe__back');
const userSearchIcon = document.querySelector('.user__searchIcon');
const userSearchInput = document.querySelector('.user__search__input');
const userBackButton = document.querySelector('.user__back');
const recipePrint = document.querySelector('.recipe__print');
const home = document.querySelector('.home');
const printerFriendlyRecipe = document.querySelector('.recipe__printerFriendly');
const recipeLeft = document.querySelector('.recipe__left');


// DATAMODEL //
let savedRecipes = [];
let currentRecipe = {};
let currentRecipes = [];

// MODIFIERS //
const show = (names) => {
  names.forEach((name) => name.classList.remove('class--hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('class--hidden'));
};

const showHome = () => {
  hide([allSection, homeButton, recipeSection, userSection]);
  show([categoriesSection, userButton]);
};

const showUserPage = () => {
  displayRecipesToCook(currentUser, recipeData, savedRecipes);
  displayRecipes(savedRecipes, userRecipes);
  show([userSection, homeButton]);
  hide([categoriesSection, recipeSection, allSection]);
};

const showFilteredRecipes = () => {
  hide([categoriesSection, recipeSection, userSection]);
  show([allSection, homeButton]);
};

const backFilteredRecipes = () => {
    displayRecipes(currentRecipes, allContainer);
    hide([categoriesSection, recipeSection, userSection]);
    show([allSection, homeButton]);
};

const loading = (currentUser) => {
  if (!currentUser.name) {
    userButton.innerText = 'Loading...';
  }
};

const viewRecipes = (event) => {
  const target = event.target.id;
  currentRecipes = filterRecipes(recipeData, target);
  if (!currentRecipes.length) {
    return null;
  }
  allHeader.innerText = target;
  displayRecipes(currentRecipes, allContainer);
  hide([categoriesSection, recipeSection, userSection]);
  show([allSection, homeButton]);
};

const viewRecipe = (recipe) => {
  show([recipeSection]);
  hide([allSection, userSection, printerFriendlyRecipe]);
  const userRecipeIngredients = recipeIngredients(recipe.name, recipeData, ingredientsData);
  userRecipeIngredients.forEach(ingredient => {
    ingredientsDisplay.innerHTML += `
    <p class= recipe__instruction style= "margin: inherit"> ${ingredient.amount.toFixed(2)} ${ingredient.unit} ${ingredient.name}</p>
    ` 
  });
  recipeTitle.innerText = recipe.name;
  imageContainer.innerHTML = `<img style= "margin: 2em;border-radius: 1.5625em" src="${recipe.image}">`;
  recipe.instructions.forEach((instruction) => instructionsDisplay.innerHTML += `<p style="align-self: flex-start;margin: 1em">${instruction.number}.) ${instruction.instruction}</p>`);
  recipeCost.innerHTML = `<p> estimated cost of ingredients: ${recipe.cost}</p>`;
};

const displayRecipes = (recipes, container) => {
  container.innerHTML = '';
  if (!recipes.length) {
    allHeader.innerText = 'No results'
  } else {
    recipes.forEach(recipe => {
      if (container !== userRecipes) {
        container.innerHTML += 
        `<div style="background-image: url(${recipe.image})" class="all__recipes" id="${recipe.id}">
        <p class='all__text' id="${recipe.id}">${recipe.name}</p>
        </div>`
      } else {
        container.innerHTML += 
        `<div style="background-image: url(${recipe.image})" class="all__recipes" id="${recipe.id}">
        <p class='all__text' id="${recipe.id}">${recipe.name}</p>
        </div>
        <button class="delete__button" id=${recipe.id}>X</button>`
      }
    })
  }
};

const selectRecipe = (event) => {
  const target = parseInt(event.target.id);
  const targetClass = event.target.parentNode.classList;
  show([backButton, saveButton]);
  
  if(targetClass.contains('user__recipes')) {
    hide([backButton, saveButton])
  }

  if(event.target.classList.contains('delete__button')) {
    deleteTheRecipe(event);
    return;
  }

  const foundRecipe = recipeData.find(recipe => recipe.id === target);
  
  if (!foundRecipe) {
    return;
  }

  currentRecipe = makeCurrentRecipe(foundRecipe, recipeData, ingredientsData);
  ingredientsDisplay.innerHTML = " ";
  instructionsDisplay.innerHTML = " ";
  viewRecipe(currentRecipe);
};

const searchRecipes = (recipes, searcher, container) => {
  if(searcher === userSearchInput) {
    show([userBackButton]);
  }
  allHeader.innerText = searcher.value;
  recipes = filterRecipes(recipes, searcher.value);
  currentRecipes = recipes;
  displayRecipes(recipes, container);
};

const createRandomUser = (usersData) => {
  let activeUser = {};
  const userId = Math.floor(Math.random()*usersData.length);
  usersData.forEach(userData => {
    if (userData.id === userId) {
      userButton.innerText = `${userData.name}`;
      userName.innerText = `Welcome ${userData.name}!`;
      activeUser = userData;
    }
  });
  return activeUser;
};

const createPrinterRecipe = () => {
  show([printerFriendlyRecipe]);
  hide([recipePrint, backButton, recipeLeft, saveButton, imageContainer, home, recipeCost, ingredientsDisplay, instructionsDisplay ]);
  printerFriendlyRecipe.innerHTML = 'Instructions:';
  currentRecipe.instructions.forEach(instruction => {
    printerFriendlyRecipe.innerHTML += 
      `<p style="margin: inherit"> ${instruction.instruction}</p>` 
  });
  printerFriendlyRecipe.innerHTML += '<br>Ingredients:';
  currentRecipe.ingredients.forEach(ingredient => {
  printerFriendlyRecipe.innerHTML += 
    `<p style="margin: inherit"> ${ingredient.amount.toFixed(2)} ${ingredient.unit} ${ingredient.name}</p>` 
  });
  printerFriendlyRecipe.innerHTML += '<br><button class="recipe__back" id="return">Return</button>'
  printerFriendlyRecipe.addEventListener('click', showRecipe);
};

const showRecipe = (event) => {
  if(event.target.id === 'return') {
    hide([printerFriendlyRecipe]);
    show([recipePrint, recipeLeft, saveButton, imageContainer, home, recipeCost, ingredientsDisplay, instructionsDisplay ]);
  }
};

// ADD/REMOVE RECIPES //

const saveTheRecipe = () => {
  const newRecipe = recipeData.filter(filteredRecipe => {
    if(filteredRecipe.name === recipeTitle.innerText && !savedRecipes.includes(filteredRecipe)) {
      return filteredRecipe.name;
    } 
  });
  
  if(!newRecipe.length) {
    return alert('this item is already saved');
  };
  
  saveRecipe(newRecipe, savedRecipes);
  const recipe = recipeToPost(currentUser, currentRecipe);
  postSavedRecipe(recipe);
};

const deleteTheRecipe = (event) => {
  const targetId = parseInt(event.target.id);
  deleteRecipe(targetId, savedRecipes);
  displayRecipes(savedRecipes, userRecipes);
};

const recipeToPost = (currentUser, currentRecipe) => {
  const recipe = {
    userID: currentUser.id,
    recipeID: currentRecipe.id
  };
  return recipe;
};

const displayRecipesToCook = (user, recipeData, savedRecipes) => {
  if(!user.recipesToCook) {
    return;
  } else {
    const foundRecipes = user.recipesToCook.forEach(savedRecipe => {
      recipeData.forEach(recipe => {
        if(savedRecipe === recipe.id && !savedRecipes.includes(recipe)) {
          savedRecipes.push(recipe);
        }  
      })
    })
  }
};

// EXPORTS //

export { 
  viewAll,
  categoriesContainer,
  allContainer,
  homeButton,
  viewSearchResults,
  saveButton,
  userButton,
  backButton,
  currentRecipes,
  savedRecipes,
  userSearchIcon,
  userSearchInput,
  userRecipes,
  searchInput,
  userBackButton,
  currentRecipe,
  recipePrint,
  loading,
  createPrinterRecipe,
  hide,
  deleteTheRecipe,
  displayRecipes,
  viewRecipes,
  viewRecipe,
  showHome,
  makeCurrentRecipe,
  selectRecipe,
  searchRecipes,
  createRandomUser,
  showUserPage,
  saveTheRecipe,
  backFilteredRecipes,
  showFilteredRecipes,
  displayRecipesToCook,
  recipeToPost
};