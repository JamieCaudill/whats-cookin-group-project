
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
  console.log(filter)
  const recipes = [];
  const lowerCaseFilter = filter.toLowerCase();
  const searchTerms = lowerCaseFilter.split(' ');

  recipeData.forEach(recipe => {
    const lowerCaseRecipeName = recipe.name.toLowerCase();
    const recipeTags = recipe.tags.map(tag => tag.toLowerCase());

    const matchName = searchTerms.every(term => lowerCaseRecipeName.includes(term));
    const matchTag = searchTerms.every(term => recipeTags.includes(term));

    if ((matchName || matchTag) || filter === 'all') {
      recipes.push(recipe);
    }
  });

  if (recipes.length === 0) {
    return 'No results';
  }
  if(filter === 'all') {
    recipeData.forEach(recipe => recipes.push(recipe));
  }
  if (!filter) {
    return [];
  }
  let uniqueRecipes = [... new Set(recipes)];
  return uniqueRecipes;
};
  
export { filterByTag, filterByName, filterRecipes }
