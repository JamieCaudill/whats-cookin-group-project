//NOTE: Your DOM manipulation will occur in this file

import recipeData from "./data/recipes.js"
import usersData from "./data/users.js"
import {globalRecipesData} from './scripts'

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
const allHeader = document.querySelector('.all__header');
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
const userRecipes = document.querySelector('.user__recipes')
const backButton = document.querySelector('.recipe__back');
const userSearchIcon = document.querySelector('.user__searchIcon')
const userSearchInput = document.querySelector('.user__search')

// DATAMODEL 
let savedRecipes = [];
let currentRecipe = {};
let currentRecipes;
// let currentRecipes = globalRecipesData


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
  displayRecipes(savedRecipes, userRecipes);
  show([userSection, homeButton]);
  hide([categoriesSection, footerSection, recipeSection, allSection])
};

const showFilteredRecipes = () => {
  hide([categoriesSection, footerSection, recipeSection, userSection]);
  show([allSection, homeButton]);
}

const backFilteredRecipes = () => {
    displayRecipes(currentRecipes, allContainer);
    hide([categoriesSection, footerSection, recipeSection, userSection]);
    show([allSection, homeButton]);
}

const viewRecipes = (event, dataset) => {
  const target = event.target.id;
  currentRecipes = filterRecipes(dataset, target)
  if (!currentRecipes.length) {
    return null;
  }
  allHeader.innerText = target;
  displayRecipes(currentRecipes, allContainer)
  hide([categoriesSection, footerSection, recipeSection, userSection]);
  show([allSection, homeButton]);
  show([backButton])
};

const viewRecipe = (recipe) => {
  show([recipeSection]);
  hide([allSection, userSection]);
  const userRecipeIngredients = recipeIngredients(recipe.name)
  userRecipeIngredients.forEach(ingredient => {
    ingredientsDisplay.innerHTML += `
    <p class= recipe__instruction style= "margin: inherit"> ${ingredient.amount} ${ingredient.unit} ${ingredient.name}</p>
    ` 
  })
  recipeTitle.innerText = recipe.name;
  imageContainer.innerHTML = `<img style= "margin: 2em;border-radius: 1.5625em" src="${recipe.image}">`;
  recipe.instructions.forEach((instruction) => instructionsDisplay.innerHTML += `<p style="align-self: flex-start;margin: 1em">${instruction.number}.) ${instruction.instruction}</p>`);
  recipeCost.innerHTML = `<p> estimated cost of ingredients: ${recipe.cost}</p>`;
};

const displayRecipes = (recipes, container) => {
  container.innerHTML = ''
  if (!recipes) {
    return 'No results'
  }
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
    <button>Delete</button>`
    }
    
  })
};

const selectRecipe = (event) => {
  const target = parseInt(event.target.id);
  const foundRecipe = recipeData.find(recipe => recipe.id === target);
  if (!foundRecipe) {
    return null;
  }
  currentRecipe = makeCurrentRecipe(foundRecipe);
  console.log(currentRecipe)
  ingredientsDisplay.innerHTML = " ";
  instructionsDisplay.innerHTML = " ";
  viewRecipe(currentRecipe);
};

const searchRecipes = (recipes, searcher, container) => {
  recipes = filterRecipes(recipes, searcher.value);
  console.log(recipes)
  if(!searcher.value || !recipes.length) {
    container.innerHTML = 
      displayRecipes(recipes, container);
       `<p class='all__text'>No Results!</p>`
  } else {
  displayRecipes(recipes, container)
  console.log(recipes)
  console.log(container)
  }
};

const createRandomUser = () => {
  const userId = Math.floor(Math.random()*usersData.length)
  usersData.forEach(userData=> {
    if (userData.id === userId) {
      userName.innerText = `Welcome ${userData.name}!`
    }
  })
};

// ADD/REMOVE RECIPES //

// This function should have its own file and own test suite
const saveRecipe = () => {
  userRecipes.innerHTML = 'Select recipe to view or right click to delete.'
  const newRecipe = recipeData.filter((filteredRecipe)=> {
    return filteredRecipe.name === recipeTitle.innerText && !savedRecipes.includes(filteredRecipe)})
    const modifiedRecipe = newRecipe.map(modifiedRecipe=> {
      modifiedRecipe.id = Date.now()
      return modifiedRecipe
    }) 
    return savedRecipes.push(...modifiedRecipe)
  }


const deleteRecipe = (event) => {
  savedRecipes.forEach(savedRecipe=> {
    if (parseInt(event.target.id) === savedRecipe.id) {
      let recipeIndex = savedRecipes.indexOf(savedRecipe)
      savedRecipes.splice(recipeIndex, 1);
      displayRecipes(savedRecipes, userRecipes)
      show([userSection])
    }
  })
}


// Search user recipes
// Event listener on user search icon
  // Use search input to filter user recipes
  // return filtered saved recipes on user page




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
  saveRecipe,
  backFilteredRecipes,
  showFilteredRecipes
}