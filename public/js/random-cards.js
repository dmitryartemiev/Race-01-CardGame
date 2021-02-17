"use strict";

import dragAndDrop from "./drag'n'drop.js";
import cards from "./script.js";




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
  }, 1000);
}

//Цикл добавления карт в колоды, а затем и в руки

//функция добавления карт в колоду
function addCardsToDeck(deck) {
  console.log(deck);

  for (let card of cards) {

    console.log('works');
   
    let $newCard = document.createElement("div");
    $newCard.classList.add("card");
    $newCard.setAttribute("draggable", "true");
    $newCard.setAttribute("id", card.id);
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

setTimeout(() => {

  addCardsToDeck($firstPlayerDeck); 
  addCardsToDeck($secondPlayerDeck);
   dragAndDrop();

 setTimeout(() => {
    addCardToHand($firstPlayerHand, $firstPlayerDeck);
    setTimeout(() => {
      addCardToHand($firstPlayerHand, $firstPlayerDeck);
      setTimeout(() => {
        addCardToHand($firstPlayerHand, $firstPlayerDeck);
      }, 1000);
    }, 1000);
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



}, 100);
 

 
