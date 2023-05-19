import { calculateCost } from "./calculate-cost";
import { recipeIngredients } from "./recipe-ingredients";
// import { currentRecipe } from "../src/data/data-model"

const makeCurrentRecipe = (recipeData) => {
  if (!recipeData) {
    return {};
  }
  const currentRecipeIngredients = recipeIngredients(recipeData.name)
  let recipe = {
    name: recipeData.name,
    image: recipeData.image,
    tags: recipeData.tags,
    cost: calculateCost(recipeData.name),
    instructions: recipeData.instructions,
    ingredients: recipeIngredients(recipeData.name)
  }
  return recipe;
};

export { makeCurrentRecipe }