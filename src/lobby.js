//with test data, make everything work with this first
let globalUserData = testUsers
let globalRecipesData = testRecipes
let globalIngredientsData = testIngredients

//once that works get rid of the test data and use the api data instead
let globalUserData = null
let globalRecipesData = null
let globalIngredientsData = null

window.addEventListener('load',() => {
  fetchData,
})

function fetchData() {
  Promise.all([fetchUserData(), fetchRecipesData(), fetchIngredientsData()])
    .then((responses) => {
      //use the api response data
      let globalUserData = responses[0].users
      let globalRecipesData = responses[1].recipes
      let globalIngredientsData = responses[1].ingredients

      //update what you need to wtih the data
      createRandomUser()
      displayRecipes()
    })
    .catch(error => console.error('Error:', error));
};