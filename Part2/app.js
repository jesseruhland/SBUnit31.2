const baseURL = "https://deckofcardsapi.com/api/deck";

// Parts 2.1, 2.2
/*
axios
  .get(baseURL + "/new/shuffle")
  .then((data) => {
    let deckId = data.data.deck_id;
    return axios.get(baseURL + `/${deckId}/draw/?count=1`);
  })
  .then((data) => {
    let deckId = data.data.deck_id;
    console.log(data.data.cards[0].value, "of", data.data.cards[0].suit);
    return axios.get(baseURL + `/${deckId}/draw/?count=1`);
  })
  .then((data) =>
    console.log(data.data.cards[0].value, "of", data.data.cards[0].suit)
  )
  .catch((err) => console.log("Error!"));
  */

const $newDeckBtn = $("#new-deck-button");
const $drawBtn = $("#draw-card-button");
const $cardBox = $("#card-box");
let deckId = "";
let remainingCards = 0;

$newDeckBtn.on("click", function () {
  axios.get(baseURL + "/new/shuffle").then((data) => {
    let id = data.data.deck_id;
    deckId = id;
    remainingCards = data.data.remaining;
    $newDeckBtn.hide();
    $drawBtn.show();
    $cardBox.html("");
  });
});

$drawBtn.on("click", function () {
  if (remainingCards > 1) {
    axios.get(baseURL + `/${deckId}/draw/?count=1`).then((data) => {
      let cardImg = document.createElement("img");
      cardImg.setAttribute("src", data.data.cards[0].image);
      cardImg.style.transform = `rotate(${Math.random() * 360}deg`;
      $cardBox.append(cardImg);
      remainingCards = data.data.remaining;
    });
  } else if ((remainingCards = 1)) {
    axios.get(baseURL + `/${deckId}/draw/?count=1`).then((data) => {
      let cardImg = document.createElement("img");
      cardImg.setAttribute("src", data.data.cards[0].image);
      cardImg.style.transform = `rotate(${Math.random() * 360}deg)`;
      $cardBox.append(cardImg);
      remainingCards = data.data.remaining;
      $newDeckBtn.show();
      $drawBtn.hide();
    });
  }
});
