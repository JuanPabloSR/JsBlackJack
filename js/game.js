// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
let types = ["C", "D", "H", "S"];
let special = ["J", "Q", "K", "A"];

//This function allows you to create a new deck
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
  console.log(deck);
  return deck;
};
createDeck();

//*This function allows you to take a one card

const takeCard = () => {
  if (deck.length === 0) {
    throw new Error("No cards in the deck");
  }

  const card = deck.pop();

  console.log(deck);
  console.log(card);
  return card;
};

// takeCard();
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const value = valueCard( takeCard() );
console.log({value}); 
console.log(value);