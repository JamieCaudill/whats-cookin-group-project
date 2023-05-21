// Your fetch requests will live here!
console.log('I will be a fetch request!')

function fetchUserData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then(response => response.json())
    .catch(error => console.error('Error fetching user data:', error));
}

function fetchRecipesData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then(response => response.json())
    .catch(error => console.error('Error fetching recipes data:', error));
}

function fetchIngredientsData() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
    .catch(error => console.error('Error fetching ingredient data:', error));
}

export { fetchUserData,
  fetchRecipesData,
  fetchIngredientsData 
}