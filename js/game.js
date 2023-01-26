// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
const types = ["C", "D", "H", "S"];
const special = ["J", "Q", "K", "A"];

let pointsPlayer = 0;
let pointsComputer = 0;

//* Refences HTML
const btnNew = document.querySelector("#btnNew");
const btnTake = document.querySelector("#btnTake");
const btnStop = document.querySelector("#btnStop");
let pointsHtml = document.querySelectorAll("small");

const divCardPlayer = document.querySelector("#player-cards");
const divCardComputer = document.querySelector("#computer-cards");

//*?This function allows you to create a new deck
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }

  for (let type of types) {
    for (let spe of special) {
      deck.push(spe + type);
    }
  }

  //   console.log(deck);
  deck = _.shuffle(deck);

  return deck;
};
createDeck();

//*This function allows you to take a one card

const takeCard = () => {
  if (deck.length === 0) {
    throw new Error("No cards in the deck");
  }

  const card = deck.pop();

  return card;
};

// takeCard();
//? Assigning value to cards
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

//* Events
//? Computer's Turn
const computerTurn = (minimunPoints) => {
  do {
    const card = takeCard();

    pointsComputer = pointsComputer + valueCard(card);
    pointsHtml[1].innerHTML = pointsComputer;

    const imgCard = document.createElement("img");
    imgCard.src = `/assets/cartas/${card}.png`;
    imgCard.classList.add("cardPlayer");
    divCardComputer.append(imgCard);

    if (minimunPoints > 21) {
      break;
    }
  } while (pointsComputer < minimunPoints && minimunPoints <= 21);

  setTimeout(() => {
    if (pointsComputer === minimunPoints) {
      alert("Nobody wins");
    } else if (minimunPoints > 21) {
      alert("Computer Wins");
    } else if (pointsComputer > 21) {
      alert("Player Wins");
    } else {
      alert("Computer Wins")
    }
  }, 100);
};

//? Player's Turn
btnTake.addEventListener("click", () => {
  const card = takeCard();

  pointsPlayer = pointsPlayer + valueCard(card);
  pointsHtml[0].innerHTML = pointsPlayer;

  const imgCard = document.createElement("img");
  imgCard.src = `/assets/cartas/${card}.png`;
  imgCard.classList.add("cardPlayer");
  divCardPlayer.append(imgCard);

  // await new Promise((resolve) => setTimeout(resolve, 100));

  if (pointsPlayer > 21) {
    console.warn('I"m sorry, you lost');
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(pointsPlayer);
  } else if (pointsPlayer === 21) {
    console.warn("21, cool!");
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(pointsPlayer);
  }
});

btnStop.addEventListener("click", () => {
  btnTake.disabled = true;
  btnStop.disabled = true;
  computerTurn(pointsPlayer);
});

btnNew.addEventListener("click", () => {
  console.clear();
  deck = []
  deck = createDeck();

  pointsPlayer = 0;
  pointsComputer = 0;

  pointsHtml[0].innerText = 0;
  pointsHtml[1].innerText = 0;

  divCardComputer.innerHTML = '';
  divCardPlayer.innerHTML = '';

  btnTake.disabled = false;
  btnStop.disabled = false;

})
