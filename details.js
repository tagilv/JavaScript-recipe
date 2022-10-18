let paramString = new URLSearchParams(window.location.search);
let id = paramString.get("id");
console.log(id);

function fetchData(id) {
  let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=1d6b052419664714bf2fab7378a281c7`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log("result>>", result);
      console.log("result.extendedIngredients>>", result.extendedIngredients);
      creatingIndividualRecipes(result);
      let ingredientsLoop = result.extendedIngredients;
      creatingIndividualReciepesGettingIngredients(ingredientsLoop);
    })
    .catch((error) => console.log(error));
}
fetchData(id);

function creatingIndividualRecipes(id) {
  const container = document.getElementById("individual-recipe-card-container");

  let leftDiv = document.createElement("div");
  leftDiv.setAttribute("class", "col-sm-4 col-sm-8");
  container.appendChild(leftDiv);

  let img = document.createElement("img");
  img.setAttribute("src", id.image);
  img.setAttribute("alt", id.title);
  leftDiv.appendChild(img);

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = id.instructions;
  leftDiv.appendChild(cardTitle);
}

function creatingIndividualReciepesGettingIngredients(ingredientsLoop) {
  const container = document.getElementById(
    "individual-ingredients-card-container"
  );

  for (let i = 0; i < ingredientsLoop.length; i++) {
    let individualRecipeDiv = document.createElement("div");
    container.appendChild(individualRecipeDiv);

    let ingredientsText = document.createElement("h2");
    ingredientsText.innerText = ingredientsLoop[i].original;
    individualRecipeDiv.appendChild(ingredientsText);
  }
}
