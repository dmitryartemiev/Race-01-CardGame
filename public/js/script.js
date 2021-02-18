import Card from "./classes/Card.js";
// import Deck from "./classes/Deck.js";
// import Hand from "./classes/Hand.js";
import Player from "./classes/Player.js";
// import Playground from "./classes/Playground.js";
import transfer from "./drag'n'drop.js";

//игроки
const firstPlayer = new Player('Jenny', 'qwerty', 'first');
const secondPlayer = new Player('Jhon', '12345', 'second');

//массив карт
let cards = [];
export default cards;

//получаем карты из json
async function getCard() {
  const response = await fetch("./js/cards.json");
  const data = await response.json();
  return [...data];
}

const promiseScript = new Promise(function (resolve, reject) {
  resolve(getCard());
});

promiseScript.then((data) => {
  return new Promise((resolve, reject) => {
    for (let item of data) {
      let card = new Card(
        item.id,
        item.title,
        item.portrait,
        item.price,
        item.health,
        item.attack
      );
      cards.push(card);
    }
    resolve();
  });
}).then(() => {
  return new Promise((resolve, reject) => {
    //добавляем карты в колоды
    firstPlayer.addDeckToPlayer()
   secondPlayer.addDeckToPlayer()

   //добавляем руки
    firstPlayer.addHand()
    secondPlayer.addHand()

    //добавляем поля для игры каждому игроку
    firstPlayer.addPlayground()
    secondPlayer.addPlayground()

  
    resolve();
  });
});


export {firstPlayer, secondPlayer, promiseScript}

