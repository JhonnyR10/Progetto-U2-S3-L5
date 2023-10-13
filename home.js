const divRiga = document.getElementById("riga");

//INIZIO CREAZIONE CARTE
const createGameCard = function (game) {
  const divCol = document.createElement("div");
  divCol.classList.add("col");
  const divCard = document.createElement("div");
  divCard.classList.add("card", "h-100", "w-100");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", game.imageUrl);
  img.setAttribute("alt", game.name);
  img.style.height = "550px";
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
  const p = document.createElement("p");
  p.innerText = "Price: " + game.price + "$";
  const dFlex = document.createElement("div");
  dFlex.classList.add("d-flex", "justify-content-evenly", "flex-wrap");
  //BOTTONE MODIFICA
  const buttonR = document.createElement("button");
  buttonR.setAttribute("type", "button");
  buttonR.classList.add("btn", "btn-danger", "removeCard");
  buttonR.innerText = "MODIFICA";
  //BOTTONE BUY
  const buttonC = document.createElement("button");
  buttonC.setAttribute("type", "button");
  buttonC.classList.add("btn", "btn-success", "addToCart");
  buttonC.innerText = "BUY";
  //BOTTONE SCOPRI DI PIU
  const buttonF = document.createElement("button");
  buttonF.setAttribute("type", "button");
  buttonF.classList.add("btn", "btn-primary", "mt-1");
  buttonF.innerText = "SCOPRI DI PIU";

  const iconC = document.createElement("i");
  iconC.className = "bi bi-cart-plus-fill ms-3";

  buttonC.addEventListener("click", function () {
    addToCart(game);
  });

  buttonR.addEventListener("click", function () {
    location.href = `backoffice.html?gameId=${game._id}`;
  });

  buttonF.addEventListener("click", function () {
    location.href = `detail.html?gameId=${game._id}`;
  });

  buttonC.appendChild(iconC);
  dFlex.appendChild(buttonC);
  dFlex.appendChild(buttonR);
  dFlex.appendChild(buttonF);
  divBody.appendChild(h5);
  divBody.appendChild(p);
  divBody.appendChild(dFlex);
  divCard.appendChild(img);
  divCard.appendChild(divBody);
  divCol.appendChild(divCard);
  divRiga.appendChild(divCol);
  return divCol;
};
//FINE CREAZIONE CARTE
let cont = 0;
//FUNZIONE REMOVECARTITEM
function removeCartItem() {
  const parentDiv = this.parentElement;
  console.log(parentDiv);
  const price = parentDiv.querySelector(".price");
  console.log(parseFloat(price.innerText));
  cont = cont - parseFloat(price.innerText);
  totali(totLi);
  // Trova l'elemento successivo (l'hr)
  const nextElement = parentDiv.nextElementSibling;
  console.log(nextElement);

  parentDiv.remove();
  nextElement.remove();
}
// FINE REMOVECARTITEM
const cartDiv = document.getElementById("cart");
const priceDiv = document.getElementById("price");
//FUNZIONE ADD TO CART
const addToCart = function (game) {
  const divFlex = document.createElement("div");
  divFlex.classList.add(
    "d-flex",
    "align-items-center",
    "text-center",
    "text-white"
  );
  const listArt = document.createElement("li");
  listArt.classList.add("col");
  listArt.innerText = game.name;
  const listPrice = document.createElement("li");
  listPrice.classList.add("col", "price");
  listPrice.innerText = game.price + "$";
  cont += parseFloat(game.price);
  console.log(cont);
  const buttonR = document.createElement("button");
  buttonR.setAttribute("type", "button");
  buttonR.classList.add("btn", "border-0");
  buttonR.addEventListener("click", removeCartItem);
  const iconR = document.createElement("i");
  iconR.className = "bi bi-cart-x-fill text-white";
  const liDivider = document.createElement("li");
  liDivider.classList.add("mb-2");
  const hrLi = document.createElement("hr");
  hrLi.classList.add("dropdown-divider");
  const totLi = document.getElementById("totLi");

  liDivider.appendChild(hrLi);
  buttonR.appendChild(iconR);

  divFlex.appendChild(listArt);
  divFlex.appendChild(listPrice);
  divFlex.appendChild(buttonR);
  cartDiv.appendChild(divFlex);
  cartDiv.appendChild(liDivider);
  totali(totLi);
};
// FINE ADD TO CART
// INIZIO FUNZIONE PER TOTALE CARRELLO
const totali = function (totLi) {
  totLi.innerText = "";
  totLi.innerText = "Total Cart " + cont.toFixed(2) + "$";
};
// FINE FUNZIONE TOTALE CARRELLO

//FUNZIONE NASCONDI SPINNER
const hideSpinner = function () {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

const getGames = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDFjYjEzOWM0MzAwMTg4MTQ1YTkiLCJpYXQiOjE2OTcxODYyNTEsImV4cCI6MTY5ODM5NTg1MX0.MFRsFLl9zSM2VaGKsFw_o0kYutg324kX3QwvshbgoGU",
    },
  })
    .then((res) => {
      hideSpinner();
      if (res.ok) {
        console.log("ok");
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
    .then((data) => {
      console.log("games", data);

      for (let i = 0; i < data.length; i++) {
        const gameCard = createGameCard(data[i]);
        divRiga.appendChild(gameCard);
      }
    })

    .catch((err) => {
      hideSpinner();
      console.log(err);
    });
};
getGames();
