//NOTE: Your DOM manipulation will occur in this file

import recipeData from "./data/recipes.js"
import usersData from "./data/users.js"
import { filterByTag, filterByName, filterRecipes } from "./functions/filter-recipes.js"
import { makeCurrentRecipe } from "./functions/current-recipe.js";
import { calculateCost } from "./functions/calculate-cost.js";
import { recipeIngredients } from "./functions/recipe-ingredients.js";

const viewAll = document.querySelector('.categories__all');
const allSection = document.querySelector('.all');
const userSection = document.querySelector('.user');
const categoriesSection = document.querySelector('.categories');
const categoriesContainer = document.querySelector('.categories__container');
const footerSection = document.querySelector('.footer');
const viewSearchResults = document.querySelector('.home__searchIcon');
const searchInput = document.querySelector('.home__searchInput');
const allContainer = document.querySelector('.all__container');
const recipeSection = document.querySelector('.recipe');
const recipeTitle = document.querySelector('.recipe__title');
const imageContainer = document.querySelector('.image__container');
const ingredientsDisplay = document.querySelector('.recipe__ingredients');
const instructionsDisplay = document.querySelector('.recipe__instructions');
const recipeCost = document.querySelector('.recipe__cost')
const homeButton = document.querySelector('.home__button')
const saveButton = document.querySelector('.recipe__sbutton');
const userButton = document.querySelector('.home__ubutton')
const userName = document.querySelector('.user__name')

// DATAMODEL 
let savedRecipes = [];
let currentRecipe = {};
let currentRecipes = [];

// Modifiers
const show = (names) => {
  names.forEach((name) => name.classList.remove('class--hidden'))
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('class--hidden'))
};

// DOM

const showHome = () => {
  hide([allSection, homeButton, recipeSection, userSection]);
  show([categoriesSection, footerSection, userButton]);
};

const showUserPage = () => {
  displayRecipes(savedRecipes);
  show([userSection, homeButton]);
};

const viewRecipes = (event) => {
  const target = event.target.id;
  currentRecipes = filterRecipes(recipeData, target)
  displayRecipes(currentRecipes)
};

const viewRecipe = (recipe) => {
  show([recipeSection]);
  hide([allSection, userSection]);
  const userRecipeIngredients = recipeIngredients(recipe.name)
  userRecipeIngredients.forEach(ingredient => {
    ingredientsDisplay.innerHTML += `
    <p>${ingredient.name}</p>
    <p>${ingredient.amount}</p>
    <p>${ingredient.unit}</p>`
  })
  recipeTitle.innerText = recipe.name;
  imageContainer.innerHTML = `<img src="${recipe.image}">`;
  recipe.instructions.forEach((instruction) => instructionsDisplay.innerHTML += `<p>${instruction.number}.) ${instruction.instruction}</p>`);
  recipeCost.innerHTML = `<p>${recipe.cost}</p>`;
};

const displayRecipes = (recipes) => {
  allContainer.innerHTML = ''
  hide([categoriesSection, footerSection, recipeSection, userSection]);
  show([allSection, homeButton]);
  if (!recipes) {
    return 'No results'
  }
  recipes.forEach(recipe => {
    allContainer.innerHTML += 
    `<div style="background-image: url(${recipe.image})" class="all__recipes" id="${recipe.id}">
      <p class='all__text' id="${recipe.id}">${recipe.name}</p>
    </div>`
  })
};

const selectRecipe = (event) => {
  const target = parseInt(event.target.id);
  const foundRecipe = recipeData.find(recipe => recipe.id === target);
  currentRecipe = makeCurrentRecipe(foundRecipe);
  viewRecipe(currentRecipe);
};

const searchRecipes = () => {
  currentRecipes = filterRecipes(recipeData, searchInput.value);
  if(!searchInput.value || !currentRecipes.length) {
    allContainer.innerHTML = 
      displayRecipes();
       `<p class='all__text'>No Results!</p>`
  } else {
  displayRecipes(currentRecipes)
  }
};

const createRandomUser = () => {
  const userId = Math.floor(Math.random()*usersData.length)
  usersData.forEach(userData=> {
    if (userData.id === userId){
      userName.innerText = `Welcome ${userData.name}!`
    }
  })
};

// ADD/REMOVE RECIPES //

const saveRecipe = () => {
  recipeData.forEach(recipe=> {
    if (recipeTitle.innerText === recipe.name) {
      savedRecipes.push(recipe);
    }
  })
};

export { 
  viewAll,
  categoriesContainer,
  allContainer,
  homeButton,
  viewSearchResults,
  saveButton,
  userButton,
  displayRecipes,
  viewRecipes,
  viewRecipe,
  showHome,
  makeCurrentRecipe,
  selectRecipe,
  searchRecipes,
  createRandomUser,
  showUserPage,
  saveRecipe
}