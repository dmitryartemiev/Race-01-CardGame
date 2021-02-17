"use strict";

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// can now use `require` in an ESM

// let Card = require("js/Card.js");
import Card from "Card.js"


console.log(Card);
//получаем карты из json
async function getCard() {
  const response = await fetch("./cards.json");
  const data = await response.json();
  return [...data];
}

// //создаем класс Карта
// class Card {
//     constructor(id, title, portrait, price, health, attack){
//         this.id = id;
//         this.title = title;
//         this.portrait = portrait;
//         this.price = price;
//         this.health = health;
//         this.attack = attack;
//     }
// }
//Цикл добавления карты в колоду
const firstPlayerDeck = document.querySelector(".first-player-deck");
const secondPlayerDeck = document.querySelector(".second-player-deck");

getCard().then((data) => {
  for (let item of data) {
    console.log(item);
  }
});
