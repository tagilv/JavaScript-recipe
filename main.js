function fetchData(ingredient) {
  let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=1d6b052419664714bf2fab7378a281c7&ingredients=${ingredient}&number=5`;
  fetch("./response.json")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      let myData = result;
      console.log(myData);
      creatingRecipes(myData);
      addEvents(myData);
      // createDropdown(data);
      const ingredientsCount = calculatingTotalNeededIngredients(myData);
      // console.log("ingredientsCount", ingredientsCount);
      // const cleanedIng = cleanedIng(ingredientsCount);
      // const filteredResult = filterByDropdown(ingredientsCount);
    })
    .catch((error) => console.log(error));
}
function localData() {
  let myData = data;
  console.log(myData);
  creatingRecipes(myData);
  addEvents(myData);
}
localData();
// fetchData("lime");

function creatingRecipes(recipes) {
  const container = document.getElementById("cards-container");

  container.innerText = "";

  for (let i = 0; i < recipes.length; i++) {
    let divCard = document.createElement("div");
    divCard.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-lg-4 g-2 g-lg-3 p-3 "
    );
    divCard.classList.add("card");
    container.appendChild(divCard);

    let img = document.createElement("img");
    img.setAttribute("src", recipes[i].image);
    img.setAttribute("alt", recipes[i].title);
    divCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    divCard.appendChild(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = recipes[i].title;
    divCard.appendChild(cardTitle);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.classList.add("invisable");
    cardText.innerText = "Add short description here";
    divCard.appendChild(cardText);

    let likeText = document.createElement("p");
    likeText.classList.add("card-text");
    likeText.innerText = `${recipes[i].likes}`;
    divCard.appendChild(likeText);
  }
}

function calculatingTotalNeededIngredients(recipes) {
  neededIngredientsArray = [];
  console.log("neededIngredientsArray>>", neededIngredientsArray);
  for (let i = 0; i < recipes.length; i++) {
    neededIngredientsArray.push(
      recipes[i].missedIngredientCount + recipes[i].usedIngredientCount
    );
  }
  return neededIngredientsArray;
}

function addEvents(recipes) {
  let cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    // divCardTextTargets = document.querySelectorAll(".card")[i];
    cards[i].addEventListener("click", (e) => {
      console.log("Works?");
      unhideText(e);
    });
  }

  let dropdown = document.getElementById("ingredientsDropdown");
  console.log("dropdown>>", dropdown);
  // We dont need const value here right?
  dropdown.addEventListener("change", (e) => {
    const value = filterByDropdown(recipes);
    // console.log("value>>", value);
  });

  let likesFilter = document.getElementById("slider");
  likesFilter.addEventListener("change", (e) => {
    // console.log("likesFilter", likesFilter);
    filterByDropdown(recipes);
  });
}

function unhideText(e) {
  const dynamicTextCard = document.querySelectorAll(".card-text");
  // console.log("e", e.currentTarget.childNodes[3]);
  e.currentTarget.childNodes[3].classList.toggle("invisable");
}

function filterByDropdown(recipes) {
  const likesValue = document.getElementById("slider").value;
  const likesValueInt = parseInt(likesValue);
  console.log(likesValueInt);

  const dropDownValue = document.getElementById("ingredientsDropdown").value;
  // console.log("dropDownValue>>", dropDownValue);
  if (dropDownValue === "allIngredientsSelected" && likesValueInt === 0) {
    creatingRecipes(recipes);
  } else if (
    dropDownValue === "allIngredientsSelected" &&
    likesValueInt !== 0
  ) {
    //filter:
    const filteredResults = recipes.filter((recipe) => {
      // console.log(recipe.likes);
      const shouldInclude = recipe.likes >= likesValueInt;
      return shouldInclude;
    });
    creatingRecipes(filteredResults);
    // filter taking values you have in this likesValuesArray 1
    // const likesValue = document.querySelectorAll(".checkbox");
    // let filteredRecepieOptionsLikes = recipes.filter((recipe) => {
    //   const totalLIkes = recipes.like;
    // });
    // console.log(filteredRecepieOptionsLikes);
  } else if (
    dropDownValue !== "allIngredientsSelected" &&
    likesValueInt.length === 0
  ) {
    const dropDownValueInt = parseInt(dropDownValue);
    let filteredRecepieOptions = recipes.filter((recipe) => {
      const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
      return count === dropDownValueInt;
    });
    creatingRecipes(filteredRecepieOptions);
    // Put whats in else
  } else {
    //Skriv .filter igen har
    // Include the second filtering in this function?
  }
}
