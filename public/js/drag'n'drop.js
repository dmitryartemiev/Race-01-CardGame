"use strict";
import { firstPlayer, secondPlayer, promiseScript } from "./script.js";

let transfer;

function dragAndDrop() {
  const cards = document.getElementsByClassName("card");
  const empties = document.querySelectorAll(".empty");

  for (let card of cards) {
    const dragStart = function () {
      transfer = this;
      setTimeout(() => {
        this.classList.add("hide");
      }, 1);
    };
    const dragEnd = function () {
      setTimeout(() => {
        this.classList.remove("hide");
      }, 0);
    };
    const dragEnter = function (evt) {
      evt.preventDefault();
      this.classList.add("aim");
    };
    const dragLeave = function () {
   
         this.classList.remove("aim");
  
      
     
    };
    const dragOver = function (evt) {
      evt.preventDefault();
      this.classList.add("aim");

    };
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    card.addEventListener("dragenter", dragEnter);
    card.addEventListener("dragleave", dragLeave);
    card.addEventListener("dragover", dragOver);
  }

  for (let empty of empties) {
    const dragOver = function (evt) {
      evt.preventDefault();
    };
    const dragEnter = function (evt) {
      evt.preventDefault();
      this.classList.add("hovered");
    };
    const dragLeave = function () {
      setTimeout(() => {
         this.classList.remove("hovered");
      }, 100);
     
    };
    const dragDrop = function () {
      // console.log("drop");
 
      let pickUpZone;
      let dropZone;
      let droppable = false;

      if (transfer.closest(".empty").closest(".hand")) {
        pickUpZone = transfer.closest(".empty").closest(".hand");
      } else if (transfer.closest(".empty").closest(".section")) {
        pickUpZone = transfer.closest(".empty").closest(".section");
      }
      if (this.closest(".hand")) {
        dropZone = this.closest(".hand");
      } else if (this.closest(".section")) {
        dropZone = this.closest(".section");
      }

      let dropZoneCL = [...dropZone.classList].join(" ");
      let pickUpZoneCL = [...pickUpZone.classList].join(" ");
//ограничения движения
      if (
        (pickUpZoneCL.includes("second-hand") &&
          dropZoneCL.includes("second-player-section")) ||
        (pickUpZoneCL.includes("second-hand") &&
          dropZoneCL.includes("second-hand"))
      ) {
        droppable = true;
      }
      if (
        pickUpZoneCL.includes("second-player-section") &&
        dropZoneCL.includes("second-player-section")
      ) {
        droppable = true;
      }
      if (
        (pickUpZoneCL.includes("first-hand") &&
          dropZoneCL.includes("first-player-section")) ||
        (pickUpZoneCL.includes("first-hand") &&
          dropZoneCL.includes("first-hand"))
      ) {
        droppable = true;
      }
      if (
        pickUpZoneCL.includes("first-player-section") &&
        dropZoneCL.includes("first-player-section")
      ) {
        droppable = true;
      }
      //атака
      if (
        pickUpZoneCL.includes("section") &&
        this.innerHTML !== "" &&
        dropZoneCL.includes("section") &&
        dropZoneCL !== pickUpZoneCL
      ) {
        let transferPartentCL = [
          ...transfer.parentElement.parentElement.classList,
        ].join(" ");
        function attack (player, enemy){
          
          let cardId = transfer.getAttribute("id");
          let foundIn;
          let cardFound;
          let enemyCardFound;


          player.hand.forEach((card) => {
            if (card.id == cardId) {
              foundIn = player.hand;
              cardFound = card;
              
            }
          });
          player.playground.forEach((card) => {
            if (card.id == cardId) {
              foundIn = player.playground;
              cardFound = card;
            }
          });

     /// инициализируем карты
        console.log(cardFound)
        console.log(' attacked' );
        let aim = dropZone.querySelector('.aim');
        enemy.playground.forEach((card) => {
          if (card.id == aim.getAttribute('id')){
            enemyCardFound = card;
          }
        })
        console.log(enemyCardFound);
        ///инициализация закончена cardFound - атакующий, enemyCardFound - жертва
        //отнимаем хп
        cardFound.health = cardFound.health - enemyCardFound.attack;
        enemyCardFound.health = enemyCardFound.health - cardFound.attack;
       let $cardFound =  document.getElementById(cardFound.id)
       $cardFound.querySelector('.defence').innerHTML = cardFound.health;
       let $enemyCardFound =  document.getElementById(enemyCardFound.id)
       $enemyCardFound.querySelector('.defence').innerHTML = enemyCardFound.health;
       //отняли
       //анимация удара
        $enemyCardFound.style.transform = 'scale(0.8)'
        $enemyCardFound.querySelector('.damage').innerHTML = `-${cardFound.attack}`
        $enemyCardFound.querySelector('.damage').style.display = 'block';
        $cardFound.querySelector('.damage').innerHTML = `-${enemyCardFound.attack}`
        $cardFound.querySelector('.damage').style.display = 'block';
        setTimeout(() => {
          $enemyCardFound.style.transform = 'scale(1)'
          $enemyCardFound.querySelector('.damage').innerHTML = ''
        $enemyCardFound.querySelector('.damage').style.display = 'none';
        $cardFound.querySelector('.damage').innerHTML = ''
        $cardFound.querySelector('.damage').style.display = 'none';
        }, 1000);
        //проанимировали
        //начинем убийство
          if(enemyCardFound.health <1){
            $enemyCardFound.style.transform = 'rotate(30deg)'
            enemy.playground.forEach((card) => {
              if (card.id == $enemyCardFound.getAttribute('id')){
                let index = enemy.playground.indexOf(card);
                enemy.playground.splice(index, 1)
              }
            })
            setTimeout(() => {

              $enemyCardFound.parentElement.innerHTML = ''
            }, 1000);
            
            console.log(enemy.playground);
          }
          if(cardFound.health <1){
            $cardFound.style.transform = 'rotate(30deg)'
            player.playground.forEach((card) => {
              if (card.id == $cardFound.getAttribute('id')){
                let index = player.playground.indexOf(card);
                player.playground.splice(index, 1)
              }
            })
            setTimeout(() => {
              $cardFound.parentElement.innerHTML = ''
            }, 1000);
            
            console.log(player.playground);
          }
        //убили


        aim.classList.remove('aim')
        }

   

        let cardOwner;
        if (transferPartentCL.match(/second/gm)) {
          cardOwner = "second";
        } else if (transferPartentCL.match(/first/gm)) {
          cardOwner = "first";
        }

        if (cardOwner === "first") {
          attack(firstPlayer, secondPlayer);

        } else if (cardOwner === "second") {
          attack(secondPlayer, firstPlayer);
        }

      }
//атака закончена
      if (!this.innerHTML == "") {
        droppable = false;
      }

      //логика перемещений
      if (droppable) {
        this.append(transfer);
        let transferPartentCL = [
          ...transfer.parentElement.parentElement.classList,
        ].join(" ");

        function movement(player) {
          let cardFound;
          let foundIn;
          let dropZoneObj;

          player.hand.forEach((card) => {
            if (card.id == cardId) {
              foundIn = player.hand;
              cardFound = card;
            }
          });
          player.playground.forEach((card) => {
            if (card.id == cardId) {
              foundIn = player.playground;
              cardFound = card;
            }
          });

          if (dropZoneCL.match(/section/gm)) {
            dropZoneObj = player.playground;
          } else if (dropZoneCL.match(/hand/gm)) {
            dropZoneObj = player.hand;
          }

          foundIn.forEach((elem) => {
            if (elem.id === cardFound.id) {
              let index = foundIn.indexOf(elem);
              console.log(index);

              dropZoneObj.push(elem);
              console.log(player.login + " playground");
              console.log(player.playground);

              foundIn.splice(index, 1);
              console.log(player.login + " hand");
              console.log(player.hand);
            }
          });
        }

        let cardOwner;
        let cardId = transfer.getAttribute("id");
        if (transferPartentCL.match(/second/gm)) {
          cardOwner = "second";
        } else if (transferPartentCL.match(/first/gm)) {
          cardOwner = "first";
        }

        if (cardOwner === "first") {
          movement(firstPlayer);
        } else if (cardOwner === "second") {
          movement(secondPlayer);
        }

      }
    };
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }
}

export default dragAndDrop;
