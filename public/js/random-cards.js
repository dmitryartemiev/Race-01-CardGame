"use strict";

import Card from "./Card.js";

//получаем карты из json
async function getCard() {
  const response = await fetch("./js/cards.json");
  const data = await response.json();
  return [...data];
}

//Цикл добавления карты в колоду
const $firstPlayerDeck = document.querySelector(".first-player-deck");
const $secondPlayerDeck = document.querySelector(".second-player-deck");


getCard().then((data) => {
  for (let item of data) {
    let card = new Card(
      item.id,
      item.title,
      item.portrait,
      item.price,
      item.health,
      item.attack
    );
    let $newCard = document.createElement('div')
    $newCard.classList.add('card')
    $newCard.setAttribute('draggable','true')
    $newCard.innerHTML=`
    <img
    class="card-portrait"
    src="${card.portrait}"
    alt=""
    draggable="false"
  />
  <div class="cost">${card.price}</div>
  <div class="defence">${card.health}</div>
  <div class="attack">${card.attack}</div>
  <div class="card-title">${card.title}</div>`
  $firstPlayerDeck.appendChild($newCard);
  }
  
  
});
