let paramString = new URLSearchParams(window.location.search);
let id = paramString.get("id");
console.log(id);

function fetchData(id) {
  const key1 = "d3a3d82595e240aeb81ed19331e08785";
  const key2 = "1d6b052419664714bf2fab7378a281c7";
  const key3 = "4756ac3dfd9e41118c1a469a02b5c16f";
  let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key3}`;

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
    .catch((error) => console.log(error, error.message));
}
fetchData(id);

function creatingIndividualRecipes(result) {
  const container = document.getElementById("individual-recipe-card-container");

  let leftDiv = document.createElement("div");
  leftDiv.setAttribute("class", "col-sm-4 col-sm-8");
  container.appendChild(leftDiv);

  let img = document.createElement("img");
  img.setAttribute("src", result.image);
  img.setAttribute("alt", result.title);
  leftDiv.appendChild(img);

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = result.instructions;
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
