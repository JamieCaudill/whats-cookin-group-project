
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

// const filterRecipes = (recipeData, filter) => {
//   const recipes = [];
//   const filteredByName = filterByName(recipeData, filter);
//   const filteredByTag = filterByTag(recipeData, filter);
  
//   if(filteredByName !== 'No results') {
//     filteredByName.forEach(recipe => recipes.push(recipe));
//   }
//   if(filteredByTag !== 'Error: try a new tag') {
//     filteredByTag.forEach(recipe => recipes.push(recipe));
//   }
//   if(filter === 'all') {
//     recipeData.forEach(recipe => recipes.push(recipe));
//   }
//   if (!filter) {
//     return [];
//   }
//   let uniqueRecipes = [... new Set(recipes)];
//   return uniqueRecipes;
// };

const filterRecipes = (recipeData, filter) => {
  const recipes = [];
  const lowerCaseFilter = filter.toLowerCase();
  console.log('parvin:', filter) 
  
  const searchTerms = lowerCaseFilter.split(' ');
  console.log('parvin', searchTerms)   
  
  recipeData.forEach(recipe => {
    const lowerCaseRecipeName = recipe.name.toLowerCase();
    const recipeTags = recipe.tags.map(tag => tag.toLowerCase());
    
    const matchName = searchTerms.some(term => lowerCaseRecipeName.includes(term));
   console.log('parvin:', matchName) 
    
    const matchTag = searchTerms.some(term => recipeTags.includes(term));
    console.log('parvin:', matchTag) 
    
    if ((matchName || matchTag) || filter === 'all') {
      recipes.push(recipe);
    }
    if (!filter) {
    return [];
  }
  });
  // if (recipes.length === 0) {
  //   return 'No results';
  // }
  let uniqueRecipes = [... new Set(recipes)];
  return uniqueRecipes;
};
  
export { filterByTag, filterByName, filterRecipes }
