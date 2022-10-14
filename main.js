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
    likeText.innerText = `${recipes[i].likes} Likes`;
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
  console.log(dropdown);
  const value = filterByDropdown(recipes);
  // We dont need const value here right?
  dropdown.addEventListener("change", (e) => {
    // console.log("value>>", value);
  });

  let likesFilter = document.querySelectorAll(".check-button", "input:checked");
  // console.log("likesFilter>>", likesFilter);
  likesFilter.forEach((item) => {
    item.addEventListener("change", (e) => {
      // console.log(likesFilter);
      // Call filtering function to move to filtering:
      // console.log(
      //   Array.from(document.querySelectorAll(".check-button", "input:checked"))
      // );
      filterByDropdown(recipes);
    });
  });
}

function unhideText(e) {
  const dynamicTextCard = document.querySelectorAll(".card-text");
  // console.log("e", e.currentTarget.childNodes[3]);
  e.currentTarget.childNodes[3].classList.toggle("invisable");
}

function filterByDropdown(recipes) {
  //Converting the node list to an array:
  const likesValuesArray = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  );
  console.log("likesValuesArray>>", likesValuesArray);

  for (let i = 0; i < likesValuesArray; i++) {
    console.log("likesValuesArray>>", likesValuesArray);
  }

  const dropDownValue = document.getElementById("ingredientsDropdown").value;
  console.log("dropDownValue>>", dropDownValue);
  if (dropDownValue === "allIngredientsSelected" && likesValuesArray == "") {
    // && Andra tom
    creatingRecipes(recipes);
  } else if (
    dropDownValue === "allIngredientsSelected" &&
    likesValuesArray.length !== 0
  ) {
    // filter taking values you have in this likesValuesArray
  } else if (
    dropDownValue !== "allIngredientsSelected" &&
    likesValuesArray.length === 0
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

// What is retrived from checkboxes is array
// Check how to retrive value of all checklecked checkboxes
// Filter according to an array (caus its not unique valkye)

//To dos
//1. Itterate over the images X
//*. Use grid to make it responsive X
//2. Text that shows and hiddes
//3. Read Ajax chapter
//4. Design
//5. AJAX AND Asynchronous calls
//*  Add Spanish food as default food
//*  Pagination?
// Question: function() in arguments but not when you include it as a argument in calling it?
// Friday fetch
// XX.json() that is a method that transfor XX to a json file (so JavaScript can read it

// // Function declaration
// function name(params) {}
// // function expression
// const myFunction = function () {};

// const arrowFnc = () => {};

// function creatingDropdown(recipes) {}

// WANT TO REMOVE DUPLICATES AND SORT TO USE FOR THE DROPDOWN LIST:

// function filterByDropdown(recipes) {
//   // console.log("I am filtering by dropdown");
//   const dropDownValue = document.getElementById("ingredientsDropdown").value;
//   console.log("dropDownValue>>", dropDownValue);
//   if (dropDownValue === "all") {
//     creatingRecipes(recipes);
//   } else {
//     const dropDownValueInt = parseInt(dropDownValue);
//     // console.log("dropDownValueInt>>", dropDownValueInt);
//     // console.log("recipes>>", recipes);
//     const filteredOptions = recipes.filter((recipe) => {
//       const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
//       return count === dropDownValueInt;
//     });
//     console.log("filteredOptions>>", filteredOptions);
//     creatingRecipes(filteredOptions);
//   }
//   // console.log(filteredOptions);
// }

// // Anvand denna
// const ALL_INGREDIENTS_SELECTED = -1;
// function filterByDropdown(recipes) {
//   // console.log("I am filtering by dropdown");
//   const dropDownValue = document.getElementById("ingredientsDropdown").value;
//   console.log("dropDownValue>>", dropDownValue);
//   // if (dropDownValue === "-1") {
//   //   creatingRecipes(recipes);
//   // } else {
//   const dropDownValueInt = parseInt(dropDownValue);
//   // console.log("dropDownValueInt>>", dropDownValueInt);
//   // console.log("recipes>>", recipes);
//   const filteredOptions = recipes.filter((recipe) => {
//     const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
//     return (
//       dropDownValueInt === ALL_INGREDIENTS_SELECTED ||
//       count === dropDownValueInt
//     );
//   });

//   console.log("filteredOptions>>", filteredOptions);
//   creatingRecipes(filteredOptions);
//   // }
//   // console.log(filteredOptions);
// }

// function filterByDropdown(recipes) {
//   // console.log("I am filtering by dropdown");
//   const dropDownValue = document.getElementById("ingredientsDropdown").value;
//   console.log("dropDownValue>>", dropDownValue);
//   if (dropDownValue === "allIngredientsSelected") {
//     creatingRecipes(recipes);
//   } else {
//     const dropDownValueInt = parseInt(dropDownValue);
//     // console.log("dropDownValueInt>>", dropDownValueInt);
//     // console.log("recipes>>", recipes);
//     const filteredOptions = recipes.filter((recipe) => {
//       const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
//       return count === dropDownValueInt;
//     });
//     console.log("filteredOptions>>", filteredOptions);
//     creatingRecipes(filteredOptions);
//   }
//   // console.log(filteredOptions);
// }

// // FILTER WIHTOUT FILTER FUNCTION

// function generalFilter(list, filtering) {
//   let filteredOptions = [];
//   for (const item of list) {
//     let shouldBeInFilteredOptions = filtering(item);
//     if (shouldBeInFilteredOptions) {
//       filteredOptions.push(item);
//     }
//   }
//   return filteredOptions;
// }
// function filterValue(recipe, dropDownValueInt) {
//   const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
//   return count === dropDownValueInt;
// }

// function filterByDropdown(recipes) {
//   // console.log("I am filtering by dropdown");
//   const dropDownValue = document.getElementById("ingredientsDropdown").value;
//   console.log("dropDownValue>>", dropDownValue);
//   if (dropDownValue === "allIngredientsSelected") {
//     creatingRecipes(recipes);
//   } else {
//     const dropDownValueInt = parseInt(dropDownValue);
//     // console.log("dropDownValueInt>>", dropDownValueInt);
//     // console.log("recipes>>", recipes);
//     // const filteredOptions = recipes.filter();

//     let filteredRecepieOptions = generalFilter(recipes, (recipe) =>
//       filterValue(recipe, dropDownValueInt)
//     );

//     // console.log("filteredOptions>>", filteredOptions);
//     creatingRecipes(filteredRecepieOptions);
//   }
//   // console.log(filteredOptions);
// }

// // borja med filterByDropdown

// filter function the values of the checkboxes that have been cliked
// inputs values, max value

// // SAVED FILTERED
// function filterByDropdown(recipes) {
//   //Converting the node list to an array:
//   const likesValuesArray = Array.from(
//     document.querySelectorAll("input[type='checkbox']:checked")
//   );
//   console.log("likesValuesArray>>", likesValuesArray);

//   const dropDownValue = document.getElementById("ingredientsDropdown").value;
//   console.log("dropDownValue>>", dropDownValue);
//   if (dropDownValue === "allIngredientsSelected") {
//     // && Andra tom
//     creatingRecipes(recipes);
//   } else {
//     const dropDownValueInt = parseInt(dropDownValue);
//     let filteredRecepieOptions = recipes.filter((recipe) => {
//       const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
//       return count === dropDownValueInt;
//     });
//     //Skriv .filter igen har
//     // Include the second filtering in this function?
//     creatingRecipes(filteredRecepieOptions);
//   }
// }

// function filterByDropdown(recipes) {
//   //Converting the node list to an array:
//   const likesValuesArray = Array.from(
//     document.querySelectorAll("input[type='checkbox']:checked")
//   );
//   console.log("likesValuesArray>>", likesValuesArray);

//   for (let i = 0; i < likesValuesArray; i++) {
//     console.log("likesValuesArray>>", likesValuesArray);
//   }

//   const dropDownValue = document.getElementById("ingredientsDropdown").value;
//   console.log("dropDownValue>>", dropDownValue);
//   if (dropDownValue === "allIngredientsSelected" && likesValuesArray == "") {
//     // && Andra tom
//     creatingRecipes(recipes);
//   } else {
//     const dropDownValueInt = parseInt(dropDownValue);
//     let filteredRecepieOptions = recipes.filter((recipe) => {
//       const count = recipe.missedIngredientCount + recipe.usedIngredientCount;
//       return count === dropDownValueInt;
//     });
//     //Skriv .filter igen har
//     // Include the second filtering in this function?
//     creatingRecipes(filteredRecepieOptions);
//   }
// }
