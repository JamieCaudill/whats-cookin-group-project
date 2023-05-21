import { expect } from 'chai';
import { filterByTag, filterByName, filterRecipes } from '../src/functions/filter-recipes';
import recipeData from '../src/data/recipes'
import sampleRecipeData from '../src/data/sample-recipes';

describe('filter recipes', () => {
  it('Should filter recipes by tag', () => {
    const filteredRecipes = filterByTag(sampleRecipeData, 'lunch');
    const filteredRecipeIds = filteredRecipes.map(recipe => recipe.id)
    expect(filteredRecipeIds).to.deep.equal([678353, 779583, 550940]);
  });

  it('Should return an error message if the tag doesn\'t exist', () => {
    const filteredRecipes = filterByTag(sampleRecipeData, 'bacon'); 
    expect(filteredRecipes).to.equal('Error: try a new tag')
  });

  it('Should filter recipes by name', () => {
    const filteredRecipes = filterByName(sampleRecipeData, 'Chocolate');
    let filteredRecipeNames = filteredRecipes.map(recipe => recipe.name);
    expect(filteredRecipeNames).to.deep.equal(['Loaded Chocolate Chip Pudding Cookie Cups', 'Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)'])
  });

  it('Should work with upper and lower case', () => {
    let filteredRecipes = filterByName(sampleRecipeData, 'chocolate');
    let filteredRecipeNames = filteredRecipes.map(recipe => recipe.name);
    expect(filteredRecipeNames).to.deep.equal(['Loaded Chocolate Chip Pudding Cookie Cups', 'Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)'])
    
    filteredRecipes = filterByName(sampleRecipeData, 'CHOCOLATE');
    filteredRecipeNames = filteredRecipes.map(recipe => recipe.name);
    expect(filteredRecipeNames).to.deep.equal(['Loaded Chocolate Chip Pudding Cookie Cups', 'Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)'])
  });

  it('should return an error message if name does not match', () => {
    let filteredRecipes = filterByName(sampleRecipeData, 'platypus');
    expect(filteredRecipes).to.equal('No results');
  })
});

// describe('filterRecipes', () => {
//   it('should return recipes filtered by name and tag', () => {
//     let filteredRecipes = filterRecipes(sampleRecipeData, 'side dish');
//     let filteredRecipeNames = filteredRecipes.map(recipe => recipe.name);
//     expect(filteredRecipeNames).to.deep.equal(['Elvis Pancakes', "Ambrosia Cupcakes", "Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)"])
//     filteredRecipes = filterRecipes(sampleRecipeData, 'chocolate');
//     filteredRecipeNames = filteredRecipes.map(recipe => recipe.name);
//     expect(filteredRecipeNames).to.deep.equal(["Loaded Chocolate Chip Pudding Cookie Cups", "Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)"])
//   })

//   it('should return an empty array if nothing matches the filter', () => {
//     let filteredRecipes = filterRecipes(sampleRecipeData, 'gnarwhale');
//     expect(filteredRecipes).to.deep.equal([]);
//   })
// });

describe('filterRecipes', () => {
  it('should return recipes that match the search term in names or tags', () => {
    const searchTerm = 'chocolate chip';
    const filteredRecipes = filterRecipes(recipeData, searchTerm);
    expect(filteredRecipes).to.have.lengthOf(3);
    expect(filteredRecipes[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should return recipes that match multiple search terms in names or tags', () => {
    const searchTerm = 'chocolate pudding';
    const filteredRecipes = filterRecipes(recipeData, searchTerm);
    expect(filteredRecipes).to.have.lengthOf(4);
    expect(filteredRecipes[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should return all recipes when filter is set to "all"', () => {
    const filter = 'all';
    const filteredRecipes = filterRecipes(recipeData, filter);
    expect(filteredRecipes).to.have.lengthOf(50);
  });

  it('should return an empty array if nothing matches the filter', () => {
    let filteredRecipes = filterRecipes(sampleRecipeData, 'gnarwhale');
    expect(filteredRecipes).to.deep.equal([]);
  })
  
  // it('should return "No results" when no recipes match the search term', () => {
  //   const searchTerm = 'gnarwhale';
  //   const filteredRecipes = filterRecipes(recipeData, searchTerm);
  //   expect(filteredRecipes).to.equal('No results');
  // });
});