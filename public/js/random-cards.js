"use strict";

import Card from "./Card.js";
import dragAndDrop from "./drag'n'drop.js";

//получаем карты из json
async function getCard() {
  const response = await fetch("./js/cards.json");
  const data = await response.json();
  return [...data];
}

//переменные из ДОМа
const $firstPlayerDeck = document.querySelector(".first-player-deck");
const $secondPlayerDeck = document.querySelector(".second-player-deck");
const $firstPlayerHand = document.querySelector("#first-player-hand");
const $secondPlayerHand = document.querySelector("#second-player-hand");

//функция добавления карты в руку
function addCardToHand(hand, deck) {
  setTimeout(() => {
    let empty;
    for (let finger of hand.children) {
      if (finger.innerHTML === "") {
        empty = finger;
      }
    }

    let cardPos = deck.children[0].getBoundingClientRect();
    let emptyPos = empty.getBoundingClientRect();
    deck.children[0].style.transform = `translate(-${cardPos.x - emptyPos.x}px)`;
    setTimeout(() => {
      deck.children[0].style.transform = `translate(0px)`;
      empty.appendChild(deck.children[0]);
      deck.children[0].remove();
    }, 1000);

    console.log(cardPos);
    console.log(emptyPos);
  }, 1000);
}

//Цикл добавления карт в колоды, а затем и в руки
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

  addCardsToDeck($firstPlayerDeck);
  addCardsToDeck($secondPlayerDeck);
  dragAndDrop();
});

setTimeout(() => {
  addCardToHand($firstPlayerHand, $firstPlayerDeck);
setTimeout(() => {
  addCardToHand($firstPlayerHand, $firstPlayerDeck);
  setTimeout(() => {
  addCardToHand($firstPlayerHand, $firstPlayerDeck);
}, 1000);
},1000);

}, 0);






setTimeout(() => {
  addCardToHand($secondPlayerHand, $secondPlayerDeck);
  setTimeout(() => {
    addCardToHand($secondPlayerHand, $secondPlayerDeck);
    setTimeout(() => {
      addCardToHand($secondPlayerHand, $secondPlayerDeck);
    }, 1000);
  }, 1000);
}, 0);