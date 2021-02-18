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
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
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
      this.classList.remove("hovered");
    };
    const dragDrop = function () {
      // console.log("drop");
      this.classList.remove("hovered");
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


        console.log("atack");


        
      }

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

          // console.log(dropZoneObj);
          // console.log(cardFound);
          // console.log(foundIn);
        } else if (cardOwner === "second") {
          movement(secondPlayer);
        }

        // console.log(cardOwner);

        // console.log("pickup " + pickUpZone);
        // console.log("dropzone " + dropZone);
      }
    };
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }
}

export default dragAndDrop;
