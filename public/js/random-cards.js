"use strict";

import Card from "./Card.js";
import dragAndDrop from "./drag'n'drop.js";

//получаем карты из json
async function getCard() {
  const response = await fetch("./js/cards.json");
  const data = await response.json();
  return [...data];
}

//Цикл добавления карты в колоду
const $firstPlayerDeck = document.querySelector(".first-player-deck");
const $secondPlayerDeck = document.querySelector(".second-player-deck");

//получаем рандомное число

getCard().then((data) => {
  //перемешать массив
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  //функция добавления карт в колоду
  function addCardsToDeck(deck) {
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

      let $newCard = document.createElement("div");
      $newCard.classList.add("card");
      $newCard.setAttribute("draggable", "true");
      $newCard.setAttribute("id", item.id);
      $newCard.innerHTML = `
    <img
    class="card-portrait"
    src="${card.portrait}"
    alt=""
    draggable="false"
  />
  <div class="cost">${card.price}</div>
  <div class="defence">${card.health}</div>
  <div class="attack">${card.attack}</div>
  <div class="card-title">${card.title}</div>`;

      deck.appendChild($newCard);
    }
  }
  addCardsToDeck($firstPlayerDeck)
  addCardsToDeck($secondPlayerDeck)

  dragAndDrop();


});
