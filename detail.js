const addressBarContent = new URLSearchParams(location.search);
const gameId = addressBarContent.get("gameId");
const divRiga = document.getElementById("riga");

//CREO LA CARD
const renderGame = function (game) {
  const divCol = document.createElement("div");
  divCol.classList.add("col");

  const divCol2 = document.createElement("div");
  divCol2.classList.add("col");

  const divCard = document.createElement("div");
  divCard.classList.add("card", "h-100");
  divCard.style.maxWidth = "600px";

  const divRow = document.createElement("div");
  divRow.classList.add("row", "row-cols-2", "g-0");

  const img = document.createElement("img");
  img.classList.add("img-fluid", "rounded-start", "h-100");
  img.setAttribute("src", game.imageUrl);
  img.setAttribute("alt", game.name);

  const divBody = document.createElement("div");
  divBody.classList.add(
    "card-body",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );
  const h5 = document.createElement("h5");
  h5.innerText = game.name;
  h5.addEventListener("click", function () {
    location.href = `detail.html?gameId=${game._id}`;
  });
  const d = document.createElement("p");
  d.innerText = game.description;
  const p = document.createElement("p");
  p.innerText = "Price: " + game.price + "$";
  const dFlex = document.createElement("div");
  dFlex.classList.add("d-flex", "justify-content-evenly");
  const buttonR = document.createElement("button");
  buttonR.setAttribute("type", "button");
  buttonR.classList.add("btn", "btn-danger", "removeCard");
  buttonR.innerText = "BACK HOME";
  buttonR.addEventListener("click", function () {
    location.href = "home.html";
  });
  const buttonC = document.createElement("button");
  buttonC.setAttribute("type", "button");
  buttonC.classList.add("btn", "btn-success", "addToCart");
  buttonC.innerText = "BUY";
  const iconC = document.createElement("i");
  iconC.className = "bi bi-cart-plus-fill ms-3";

  buttonC.addEventListener("click", function () {
    addToCart(game);
  });

  buttonC.appendChild(iconC);
  dFlex.appendChild(buttonC);
  dFlex.appendChild(buttonR);
  divBody.appendChild(h5);
  divBody.appendChild(d);
  divBody.appendChild(p);
  divBody.appendChild(dFlex);
  divCol2.appendChild(img);
  divCard.appendChild(divRow);
  divCol.appendChild(divBody);
  divRow.appendChild(divCol2);
  divRow.appendChild(divCol);
  divRiga.appendChild(divCard);
  return divCard;
};
//FUNZIONE NASCONDI SPINNER
const hideSpinner = function () {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

fetch("https://striveschool-api.herokuapp.com/api/product/" + gameId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDFjYjEzOWM0MzAwMTg4MTQ1YTkiLCJpYXQiOjE2OTcxODYyNTEsImV4cCI6MTY5ODM5NTg1MX0.MFRsFLl9zSM2VaGKsFw_o0kYutg324kX3QwvshbgoGU",
  },
})
  .then((res) => {
    hideSpinner();
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 404) {
        alert("404 - Not Found");
        throw new Error("404 - Not Found");
      } else if (res.status === 500) {
        alert("500 - Internal Server Error");
        throw new Error("500 - Internal Server Error");
      } else {
        alert("Errore generico");
        throw new Error("Errore generico");
      }
    }
  })
  .then((details) => {
    console.log(details);
    const gameCard = renderGame(details);
    divRiga.appendChild(gameCard);
  })
  .catch((err) => {
    hideSpinner();
    console.log(err);
  });
