// FETCH REQUESTS //

const fetchRecipes = fetch(`https://whats-cookin-api.onrender.com/api/v1/recipes`);
const fetchIngredients = fetch(`https://whats-cookin-api.onrender.com/api/v1/ingredients`);
const fetchUsers = fetch(`https://whats-cookin-api.onrender.com/api/v1/users`);
const postSavedRecipe = (data) => {
  fetch('https://whats-cookin-api.onrender.com/api/v1/usersRecipes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
  }
})
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      alert(`${response.status} server request failed, please try again later`)
      console.error('Request failed with status:', response.status)
    }
  })
  .then(json => console.log(json))
  .catch(err => console.log(err))
};

export { fetchRecipes, fetchIngredients, fetchUsers, postSavedRecipe };