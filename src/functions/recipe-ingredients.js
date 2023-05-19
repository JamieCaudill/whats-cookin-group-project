// recipe ingredients function here

import ingredientsData from "../data/ingredients";
import recipeData from "../data/recipes";

const recipeIngredients = (recipeName) => {
  const outputArray = [];
  const filteredRecipe = recipeData.find((recipe) => recipe.name === recipeName
   );
   if (!filteredRecipe){
     return `Sorry, cannot find a recipe for ${recipeName}.`
   }

   filteredRecipe.ingredients.forEach(recipeIngredient => {
    ingredientsData.forEach(ingredient => {
      if (recipeIngredient.id === ingredient.id) {
        let output = {};
        output.name = ingredient.name;
        output.amount = recipeIngredient.quantity.amount;
        output.unit = recipeIngredient.quantity.unit;
        output.cost = ingredient.estimatedCostInCents;
        outputArray.push(output);
      }
    })
  })
  return outputArray;
}

export { recipeIngredients };