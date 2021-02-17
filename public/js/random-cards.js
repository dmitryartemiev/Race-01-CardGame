"use strict";

import Card from './Card.js';

console.log(Card);
//получаем карты из json
async function getCard() {
  const response = await fetch("./js/cards.json");
  const data = await response.json();
  return [...data];
}


//Цикл добавления карты в колоду
const firstPlayerDeck = document.querySelector(".first-player-deck");
const secondPlayerDeck = document.querySelector(".second-player-deck");

getCard().then((data) => {
  for (let item of data) {
    console.log(item);
  }
});
