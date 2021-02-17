import Card from "./classes/Card.js";
import Deck from "./classes/Deck.js";
import Hand from "./classes/Hand.js"
import Player from "./classes/Player.js"
import Playground from "./classes/Playground.js"

//получаем карты из json
async function getCard() {
    const response = await fetch("./js/cards.json");
    const data = await response.json();
    return [...data];
  }

//перемешать массив

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //функция добавления карт в колоду
let cards = []
export default cards;

getCard().then((data) => {
    shuffleArray(data);
    for (let item of data) {
      let card = new Card(
        item.id,
        item.title,
        item.portrait,
        item.price,
        item.health,
        item.attack
      );
     cards.push(card)
    }
})


