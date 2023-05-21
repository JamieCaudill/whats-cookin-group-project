// Your fetch requests will live here!
console.log('I will be a fetch request!')

const fetchData = (dataset) => {
  return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${dataset}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log(response.statusText)
    }
  })
  .catch((error) => console.log(error))
}

// function fetchUserData() {
//   return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
//     .then(response => response.json())
//     .catch(error => console.error('Error fetching user data:', error));
// }

// function fetchRecipesData() {
//   return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
//     .then(response => response.json())
//     .catch(error => console.error('Error fetching recipes data:', error));
// }

// function fetchIngredientsData() {
//   return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
//     .then(response => response.json())
//     .catch(error => console.error('Error fetching ingredient data:', error));
// }

const fetchPromises = () => {
  return Promise.all([fetchData('users'), fetchData('recipes'), fetchData('ingredients')])
    
    //  console.log('usersData', responses[0].users)
    //  console.log('responses', responses[0].users[0].name)
    //  console.log('recipeData', responses[1].recipes)
    //  console.log('ingredientsData', responses[2].ingredients)
     
       // All data is fetched and global variables are updated
      //use the api response data
    // globalUserData = responses[0].users
    // globalRecipesData = responses[1].recipes
    // globalIngredientsData = responses[2].ingredients

      // manipulate data or update UI here.
      // call functions that update the DOM to display the recipes or other.
      //update what you need to wtih the data

    // createRandomUser()
    // displayRecipes()
 
    // .catch(error => console.error('Error:', error));
};

export { 
  fetchData,
  // fetchRecipesData,
  // fetchIngredientsData,
  fetchPromises
}