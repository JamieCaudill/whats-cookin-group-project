
// filter by tag function

const filterByTag = (recipeData, tagInput) => {
  const filteredRecipes = recipeData.reduce((acc, recipe) => {
    recipe.tags.forEach(tag => {
      if (tag === tagInput) {
        acc.push(recipe)
      } 
    })
    return acc;
  }, [])
  if (filteredRecipes.length === 0) {
    return 'Error: try a new tag';
  } else {
    return filteredRecipes;
  }
};

const filterByName = (recipeData, name) => {
  const lowerCaseName = name.toLowerCase();

  const filteredRecipesByName = recipeData.reduce((filteredRecipes, recipe) => {
    const lowerCaseRecipe = recipe.name.toLowerCase();
    if (lowerCaseRecipe.includes(lowerCaseName)) {
      filteredRecipes.push(recipe);
    }
    return filteredRecipes;
  }, []);

  if (!filteredRecipesByName.length) {
    return 'No results';
  }

  return filteredRecipesByName;
};

const filterRecipes = (recipeData, filter) => {
  const recipes = [];
  const filteredByName = filterByName(recipeData, filter);
  const filteredByTag = filterByTag(recipeData, filter);
  
  if(filteredByName !== 'No results') {
    filteredByName.forEach(recipe => recipes.push(recipe));
  }
  if(filteredByTag !== 'Error: try a new tag') {
    filteredByTag.forEach(recipe => recipes.push(recipe));
  }
  if(filter === 'all') {
    recipeData.forEach(recipe => recipes.push(recipe));
  }
  return recipes;
};
  

export { filterByTag, filterByName, filterRecipes }
