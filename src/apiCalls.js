// Your fetch requests will live here!


// console.log('I will be a fetch request!')

// Pseudocode.
// Need to make theee functions that will each fetch the separate pieces of data, 
// in the .then need to change response to json, and 
// then manipulating a global variable
// Define a function fetchApi that takes a URL parameter.
// Inside fetchApi:
// Use the fetch function to make a GET request to the specified URL.
// If the response is successful (status code 200-299), return the JSON data.
// Otherwise, throw an error with the message ‘No Such Path’.
// Define a function fetchAllData.
// Inside fetchAllData:
// Use Promise.all to make parallel requests to fetch data from the ‘users’, ‘recipes’, and ‘ingredients’ endpoints.
// Return a promise that resolves to an array of the fetched data.
// If there is an error during the fetching process, call the handleError function.


//In our case, we want to fetch different pieces of data and update global variables, ywe can define three separate functions. Each function will make a fetch request, convert the response to JSON, and then update the relevant global variable. Here's an example:

let globalUserData = null;
let globalRecipesData = null;
let globalIngredientsData = null;

//Get all users
function fetchUserData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users") 
    .then(response => response.json())
    // .then(data => {
    //   console.log("userData from fetch call", data)
    //   // globalUserData = data;
    // })
    .catch(error => console.error('Error fetching user data:', error));
}
//Get all recipes
function fetchRecipesData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then(response => response.json())
    // .then(data => {
    //   console.log("recipesData from fetch call", data)
    //   // globalRecipesData = data;
    // })
    .catch(error => console.error('Error fetching recipes data:', error));
}
// // Get all ingredients
function fetchIngredientsData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
    // .then(data => {
    //   console.log("ingredientData from fetch call", data)
    //   // globalIngredientsData = data;
   // })
    .catch(error => console.error('Error fetching another data:', error));
}

//   Since these are asynchronous operations, the global variables will not be immediately available after the fetch functions are called. They will be available once the corresponding fetch request completes and the data is assigned.
//   If we want to ensure all fetch requests are completed before we do something (like manipulating data or rendering UI), we can use Promise.all:

// window.onload = function() {
//     Promise.all([fetchUserData(), fetchRecipesData(), fetchIngredientsData()])
//       .then(() => {
//         // All data is fetched and global variables are updated
//         // You can manipulate data or update UI here
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   In this setup, the code inside the .then() of Promise.all will not run until all fetch requests are completed.

export { fetchUserData,
  fetchRecipesData,
  fetchIngredientsData 
}