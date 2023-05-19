
import { expect } from 'chai';
import { makeCurrentRecipe } from "../src/functions/current-recipe";
import sampleRecipeData from "../src/data/sample-recipes"

describe('makeCurrentRecipe', () => {
  it('should return an object', () => {
    const currentRecipe = makeCurrentRecipe(sampleRecipeData[0]);
    expect(currentRecipe.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
    expect(currentRecipe.cost).to.equal('$177.76');
  });

  it('should return an empty object if no recipe is passed in', () => {
    expect(makeCurrentRecipe()).to.deep.equal({});
  })
});