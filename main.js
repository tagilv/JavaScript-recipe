function fetchData() {
  fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?apiKey=d3a3d82595e240aeb81ed19331e08785&ingredients=lime&number=5"
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log("result>>", result);
      let myData = result;
      creatingRecipes(myData);
      addEvents();
    })
    .catch((error) => console.log(error));
}

function creatingRecipes(data) {
  const container = document.getElementById("cards-container");

  for (let i = 0; i < data.length; i++) {
    //Add DOM elements and bring in dynamic data:
    let divCard = document.createElement("div");
    // divCard.setAttribute("style", "width: 18rem;");
    divCard.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-lg-4 g-2 g-lg-3 p-3 "
    );
    divCard.classList.add("card");
    container.appendChild(divCard);

    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("alt", data[i].title);
    divCard.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    divCard.appendChild(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = data[i].title;
    divCard.appendChild(cardTitle);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.classList.add("invisable");
    cardText.innerText = "Add short description here";
    divCard.appendChild(cardText);
  }
}

function addEvents() {
  for (let i = 0; i < document.querySelectorAll(".card").length; i++) {
    divCardTextTargets = document.querySelectorAll(".card")[i];

    divCardTextTargets.addEventListener("click", (e) => {
      unhideText(e);
    });
  }
}

function unhideText(e) {
  const dynamicTextCard = document.querySelectorAll(".card-text");
  console.log("e", e.currentTarget.childNodes[3]);
  e.currentTarget.childNodes[3].classList.toggle("invisable");
}

fetchData();

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
