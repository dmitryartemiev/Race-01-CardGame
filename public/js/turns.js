import { firstPlayer, secondPlayer } from "./script.js";
import addCardToHandRender from "./render.js";

firstPlayer.turn = true;
secondPlayer.turn = false;

firstPlayer.coins = 1;
secondPlayer.coins = 0;
firstPlayer.coinsMax = 1;
secondPlayer.coinsMax = 1;

const $firstPlayerDeck = document.querySelector(".first-player-deck");
const $secondPlayerDeck = document.querySelector(".second-player-deck");
const $firstPlayerHand = document.querySelector("#first-player-hand");
const $secondPlayerHand = document.querySelector("#second-player-hand");
let $firstPlayerCoins = document.querySelector("#first-player-coins-amount");
let $secondPlayerCoins = document.querySelector("#second-player-coins-amount");
let $firstPlayerCoinsCont = document.querySelector("#first-player-coins");
let $secondPlayerCoinsCont = document.querySelector("#second-player-coins");
let $roundButton = document.querySelector(".round-button");
let $coin = document.createElement("div");
$coin.classList.add("coin");
let $time = document.querySelector(".time");

let $firstPlayerTitle = document.querySelector(".first-player-title");
let $secondPlayerTitle = document.querySelector(".second-player-title");
let $turn = document.querySelector(".turn");

$turn.innerHTML = `turn: ${firstPlayer.login}`;
$firstPlayerTitle.innerHTML = firstPlayer.login;
$secondPlayerTitle.innerHTML = secondPlayer.login;

function turn(player, second, secondHand, secondDeck, coinsVal, coinsCont) {
  if (player.turn === true) {
    player.turn = false;
    second.turn = true;
    addCardToHandRender(secondHand, secondDeck, second);
    $turn.innerHTML = `turn: ${second.login}`;

    
    let coinsArr = [...coinsCont.getElementsByClassName("grey-coin")];
    for (let item of coinsArr) {
        item.classList.add('coin')
      item.classList.remove("grey-coin");
    }
    second.coins = second.coinsMax;

    if (second.coinsMax < 6) {
      second.coinsMax++;
      second.coins = second.coinsMax;
      coinsCont.innerHTML += `<div class="coin "></div>`;
    }

    coinsVal.innerHTML = `${second.coins}/${second.coinsMax}`;

    console.log("turned");
  }
}
function nextTurn() {
  if (firstPlayer.turn === true) {
    turn(
      firstPlayer,
      secondPlayer,
      $secondPlayerHand,
      $secondPlayerDeck,
      $secondPlayerCoins,
      $secondPlayerCoinsCont
    );
  } else if (secondPlayer.turn === true) {
    turn(
      secondPlayer,
      firstPlayer,
      $firstPlayerHand,
      $firstPlayerDeck,
      $firstPlayerCoins,
      $firstPlayerCoinsCont
    );
  }
}

//таймер
$roundButton.disabled = true;
setInterval(() => {
    $roundButton.disabled = false;
}, 5000);

$roundButton.addEventListener("click", (evt) => {
    $roundButton.disabled = true;
    setInterval(() => {
        $roundButton.disabled = false;
    }, 5000);
  nextTurn();
  clearInterval(interval);
  $time.innerHTML = 30;
  interval = setInterval(() => {
    nextTurn();
  }, 30000);
});
let interval;

setTimeout(() => {
  setInterval(() => {
    $time.innerHTML--;
    if ($time.innerHTML == 0) {
      $time.innerHTML = 30;
    }
  }, 1000);
  interval = setInterval(() => {
    nextTurn();
  }, 30000);
}, 6000);
