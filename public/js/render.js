"use strict";

import dragAndDrop from "./drag'n'drop.js";
// import cards from "./script.js";
import {firstPlayer, secondPlayer, promiseScript} from "./script.js"



//переменные из ДОМа
const $firstPlayerDeck = document.querySelector(".first-player-deck");
const $secondPlayerDeck = document.querySelector(".second-player-deck");
const $firstPlayerHand = document.querySelector("#first-player-hand");
const $secondPlayerHand = document.querySelector("#second-player-hand");

//функция добавления карты в руку
function addCardToHandRender($hand, $deck, player) {
player.addCardToHand();
  setTimeout(() => {
   

    let $empty;
    for (let $singleEmptyPlace of $hand.children) {
      if ($singleEmptyPlace.innerHTML === "") {
        $empty = $singleEmptyPlace;
      }
    }

    let cardPos = $deck.children[0].getBoundingClientRect();
    let emptyPos = $empty.getBoundingClientRect();
    $deck.children[0].style.transform = `translate(-${cardPos.x - emptyPos.x}px)`;

    setTimeout(() => {
     
      $deck.children[0].style.transform = `translate(0px)`;
      $empty.appendChild($deck.children[0]);
      // $deck.children[0].remove()
       
    }, 1000);


  }, 1000);
}

//Цикл добавления карт в колоды, а затем и в руки

//функция рендера добавления карт в колоду
function addCardsToDeck($deck, deckObj) {
  for (let card of deckObj) {
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
  <div class="damage">damage</div>
  <div class="cost">${card.price}</div>
  <div class="defence">${card.health}</div>
  <div class="attack">${card.attack}</div>
  <div class="card-title">${card.title}</div>`;
    $deck.appendChild($newCard);
  }
}




  console.log(firstPlayer);
  console.log(secondPlayer);

// const promiseRender = new Promise((resolve, reject) =>{

setTimeout(() => {
  
  promiseScript.then(()=>{

    return new Promise((resolve, reject) => {
      addCardsToDeck($firstPlayerDeck, firstPlayer.deck); 
addCardsToDeck($secondPlayerDeck, secondPlayer.deck);
resolve()
    })
  }).then(()=>{
    //добавляем по 3 карты в начале игры
    setTimeout(() => {
      addCardToHandRender($firstPlayerHand, $firstPlayerDeck, firstPlayer);
      addCardToHandRender($secondPlayerHand, $secondPlayerDeck, secondPlayer);
          setTimeout(() => {
          addCardToHandRender($firstPlayerHand, $firstPlayerDeck, firstPlayer);
          addCardToHandRender($secondPlayerHand, $secondPlayerDeck, secondPlayer);
              setTimeout(() => {
              addCardToHandRender($firstPlayerHand, $firstPlayerDeck, firstPlayer);
              addCardToHandRender($secondPlayerHand, $secondPlayerDeck, secondPlayer);
              }, 1000);
          }, 1000);
    }, 1000);
    //закончили добавлять по 3 карты в начале игры
    dragAndDrop();
   
   
  })


},100)

// })



// setTimeout(() => {


//   //добавляем по 3 карты с колоды в руки
//     firstPlayer.addCardToHand()
//     secondPlayer.addCardToHand()
//     firstPlayer.addCardToHand()
//     secondPlayer.addCardToHand()
//     firstPlayer.addCardToHand()
//     secondPlayer.addCardToHand()

//  setTimeout(() => {

//     addCardToHand($firstPlayerHand, $firstPlayerDeck, firstPlayer.hand, firstPlayer.deck);

//     setTimeout(() => {
//       addCardToHand($firstPlayerHand, $firstPlayerDeck, firstPlayer.hand,firstPlayer.deck);
//       setTimeout(() => {
//         addCardToHand($firstPlayerHand, $firstPlayerDeck, firstPlayer.hand,firstPlayer.deck);
//       }, 1000);
//     }, 1000);
//   }, 0);

//   setTimeout(() => {
//     addCardToHand($secondPlayerHand, $secondPlayerDeck, secondPlayer.hand, secondPlayer.deck);
//     setTimeout(() => {
//       addCardToHand($secondPlayerHand, $secondPlayerDeck, secondPlayer.hand, secondPlayer.deck);
//       setTimeout(() => {
//         addCardToHand($secondPlayerHand, $secondPlayerDeck, secondPlayer.hand, secondPlayer.deck);
//       }, 1000);
//     }, 1000);
//   }, 0);


//    dragAndDrop();
// }, 100);
 

 
