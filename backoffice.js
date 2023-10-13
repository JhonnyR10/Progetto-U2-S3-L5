const addressBarContent = new URLSearchParams(location.search);
const gameId = addressBarContent.get("gameId");
const formReference = document.getElementById("form");

const eliminaGame = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + gameId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDFjYjEzOWM0MzAwMTg4MTQ1YTkiLCJpYXQiOjE2OTcxODYyNTEsImV4cCI6MTY5ODM5NTg1MX0.MFRsFLl9zSM2VaGKsFw_o0kYutg324kX3QwvshbgoGU",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("GIOCO ELIMINATO CORRETTAMENTE");
        location.href = "home.html";
      } else {
        alert("ERRORE NEL RECUPERO DETTAGLIO");
        throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
};

if (gameId) {
  // SE SONO IN MODALITA MODIFICA AGGIUNGO I DETTAGLI NEL CAMPO DEL FORM E AGGIUNGO I BOTTONI PER LA MODIFICA
  fetch("https://striveschool-api.herokuapp.com/api/product/" + gameId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDFjYjEzOWM0MzAwMTg4MTQ1YTkiLCJpYXQiOjE2OTcxODYyNTEsImV4cCI6MTY5ODM5NTg1MX0.MFRsFLl9zSM2VaGKsFw_o0kYutg324kX3QwvshbgoGU",
    },
  })
    .then((res) => {
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
    .then((gameDetails) => {
      const titoloInput = document.getElementById("titolo");
      const descriptionInput = document.getElementById("description");
      const priceInput = document.getElementById("price");
      const genereInput = document.getElementById("genere");
      const imgInput = document.getElementById("img");
      const brandInput = document.getElementById("brand");

      // AGGIUNGO DETTAGLI DEL GIOCO
      titoloInput.value = gameDetails.name;
      descriptionInput.value = gameDetails.description;
      priceInput.value = gameDetails.price;
      brandInput.value = gameDetails.brand;
      genereInput.value = gameDetails.genere;
      imgInput.value = gameDetails.imageUrl;
      //CAMBIO IL BOTTONE SUBMIT IN EDIT
      const bottoneS = document.getElementById("Se");
      bottoneS.innerText = "EDIT";
      //AGGIUNGO BOTTONE ELIMINA
      const bottoneE = document.createElement("button");
      bottoneE.setAttribute("type", "button");
      bottoneE.classList.add("btn", "btn-danger");
      bottoneE.innerText = "DELETE";
      formReference.appendChild(bottoneE);
      bottoneE.addEventListener("click", function () {
        if (confirm("Sei sicuro di voler eliminare questo elemento?")) {
          eliminaGame();
        }
      });
    })
    .catch((err) => {
      console.log("errore", err);
    });
} else {
  //AGGIUNGO IL BOTTONE RESET SE NON SONO IN MODALITA MODIFICA
  const titoloInput = document.getElementById("titolo");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const genereInput = document.getElementById("genere");
  const imgInput = document.getElementById("img");
  const brandInput = document.getElementById("brand");
  const bReset = document.createElement("button");
  bReset.setAttribute("type", "button");
  bReset.classList.add("btn", "btn-danger");
  bReset.innerText = "RESET";
  formReference.appendChild(bReset);
  bReset.addEventListener("click", function () {
    if (confirm("Sei sicuro di voler resettare tutti i campi?")) {
      titoloInput.value = "";
      descriptionInput.value = "";
      priceInput.value = "";
      genereInput.value = "";
      imgInput.value = "";
      brandInput.value = "";
    }
  });
}

formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invio i dati all'API");

  const titoloInput = document.getElementById("titolo");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const genereInput = document.getElementById("genere");
  const imgInput = document.getElementById("img");
  const brandInput = document.getElementById("brand");

  if (
    !titoloInput.value ||
    !descriptionInput.value ||
    !priceInput.value ||
    !genereInput.value ||
    !imgInput.value
  ) {
    alert(
      "Tutti i campi sono obbligatori. Si prega di compilare tutti i campi."
    );
    return;
  }

  const newGame = {
    name: titoloInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
    genere: genereInput.value,
  };

  console.log("Ecco l'oggetto che manderò alle API", newGame);

  let methodToUse = "POST";
  if (gameId) {
    methodToUse = "PUT";
  }

  let urlToUse = "https://striveschool-api.herokuapp.com/api/product/";
  if (gameId) {
    urlToUse = "https://striveschool-api.herokuapp.com/api/product/" + gameId;
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newGame),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MDFjYjEzOWM0MzAwMTg4MTQ1YTkiLCJpYXQiOjE2OTcxODYyNTEsImV4cCI6MTY5ODM5NTg1MX0.MFRsFLl9zSM2VaGKsFw_o0kYutg324kX3QwvshbgoGU",
    },
  })
    .then((res) => {
      console.log("OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST", res);
      if (res.ok) {
        alert("EVENTO SALVATO CORRETTAMENTE!");
      } else {
        alert("ERRORE NEL SALVATAGGIO DELL'EVENTO");
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
});
