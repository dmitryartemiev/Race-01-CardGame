"use strict";

function dragAndDrop() {
  const cards = document.getElementsByClassName("card");
  const empties = document.querySelectorAll(".empty");
  let transfer;

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
      console.log('drop');
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

      dropZone = [...dropZone.classList].join(" ");
      pickUpZone = [...pickUpZone.classList].join(" ");

      if (
        (pickUpZone.includes("second-hand") &&
          dropZone.includes("second-player-section")) ||
        (pickUpZone.includes("second-hand") && dropZone.includes("second-hand"))
      ) {
        droppable = true;
      }
      if (
        pickUpZone.includes("second-player-section") &&
        dropZone.includes("second-player-section")
      ) {
        droppable = true;
      }
      if (
        (pickUpZone.includes("first-hand") &&
          dropZone.includes("first-player-section")) ||
        (pickUpZone.includes("first-hand") && dropZone.includes("first-hand"))
      ) {
        droppable = true;
      }
      if (
        pickUpZone.includes("first-player-section") &&
        dropZone.includes("first-player-section")
      ) {
        droppable = true;
      }
      //атака
      if (
        pickUpZone.includes("section") &&
        this.innerHTML !== "" &&
        dropZone.includes("section") && 
        dropZone !== pickUpZone
      ) {
        console.log("atack");
      }

      if (!this.innerHTML == "") {
        droppable = false;
      }

      if (droppable) {
        this.append(transfer);
      }

      // console.log(pickUpZone);
      // console.log(dropZone);
    };
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }
}

export default dragAndDrop;
