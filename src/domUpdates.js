// DOM MANIPULATION //

// IMPORTS //

import { filterRecipes } from "./functions/filter-recipes.js"
import { makeCurrentRecipe } from "./functions/current-recipe.js";
import { recipeIngredients } from "./functions/recipe-ingredients.js";
import { recipeData, usersData, ingredientsData } from './apiCalls'
import { saveRecipe } from './functions/save-recipe.js'

// QUERY SELECTORS //

const viewAll = document.querySelector('.categories__all');
const allSection = document.querySelector('.all');
const userSection = document.querySelector('.user');
const categoriesSection = document.querySelector('.categories');
const categoriesContainer = document.querySelector('.categories__container');
const footerSection = document.querySelector('.footer');
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

// DATAMODEL //
let savedRecipes = [];
let currentRecipe = {};
let currentRecipes = recipeData;

// MODIFIERS //
const show = (names) => {
  names.forEach((name) => name.classList.remove('class--hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('class--hidden'));
};

// DOM //

const showHome = () => {
  hide([allSection, homeButton, recipeSection, userSection]);
  show([categoriesSection, footerSection, userButton]);
};

const showUserPage = () => {
  displayRecipes(savedRecipes, userRecipes);
  show([userSection, homeButton]);
  hide([categoriesSection, footerSection, recipeSection, allSection]);
};

const showFilteredRecipes = () => {
  hide([categoriesSection, footerSection, recipeSection, userSection]);
  show([allSection, homeButton]);
};

const backFilteredRecipes = () => {
    displayRecipes(currentRecipes, allContainer);
    hide([categoriesSection, footerSection, recipeSection, userSection]);
    show([allSection, homeButton]);
};

const viewRecipes = (event) => {
  const target = event.target.id;
  currentRecipes = filterRecipes(recipeData, target);
  if (!currentRecipes.length) {
    return null;
  }
  allHeader.innerText = target;
  displayRecipes(currentRecipes, allContainer);
  hide([categoriesSection, footerSection, recipeSection, userSection]);
  show([allSection, homeButton]);
  show([backButton]);
};

const viewRecipe = (recipe) => {
  show([recipeSection]);
  hide([allSection, userSection]);
  const userRecipeIngredients = recipeIngredients(recipe.name, recipeData, ingredientsData);
  userRecipeIngredients.forEach(ingredient => {
    ingredientsDisplay.innerHTML += `
    <p class= recipe__instruction style= "margin: inherit"> ${ingredient.amount} ${ingredient.unit} ${ingredient.name}</p>
    ` 
  });
  recipeTitle.innerText = recipe.name;
  imageContainer.innerHTML = `<img style= "margin: 2em;border-radius: 1.5625em" src="${recipe.image}">`;
  recipe.instructions.forEach((instruction) => instructionsDisplay.innerHTML += `<p style="align-self: flex-start;margin: 1em">${instruction.number}.) ${instruction.instruction}</p>`);
  recipeCost.innerHTML = `<p> estimated cost of ingredients: ${recipe.cost}</p>`;
};

const displayRecipes = (recipes, container) => {
  container.innerHTML = ''
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
  if(event.target.classList.contains('delete__button')) {
    deleteRecipe(event);
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
  recipes = filterRecipes(recipes, searcher.value);
  displayRecipes(recipes, container);
};

const createRandomUser = () => {
  const userId = Math.floor(Math.random()*usersData.length);
  usersData.forEach(userData=> {
    if (userData.id === userId) {
      userButton.innerText = `${userData.name}`;
      userName.innerText = `Welcome ${userData.name}!`;
    }
  });
};

// ADD/REMOVE RECIPES //

const saveTheRecipe = () => {

  const newRecipe = recipeData.filter((filteredRecipe)=> {
    return filteredRecipe.name === recipeTitle.innerText && !savedRecipes.includes(filteredRecipe)})
    saveRecipe(newRecipe, savedRecipes)
  }

const deleteRecipe = (event) => {
  const target = (event.target.class);
  savedRecipes.forEach(savedRecipe=> {
    if (parseInt(event.target.id) === savedRecipe.id) {
      let recipeIndex = savedRecipes.indexOf(savedRecipe);
      savedRecipes.splice(recipeIndex, 1);
      displayRecipes(savedRecipes, userRecipes);
    }
  })
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
  deleteRecipe,
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
  showFilteredRecipes
}