"use strict";
const dragAndDrop = () => {
  const cards = document.querySelectorAll(".card");
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
          event.preventDefault();
          console.log('over')
      }
      const dragEnter = function (evt) {
          event.preventDefault();
          this.classList.add('hovered')
          console.log('enter');
      }
      const dragLeave = function () {
        this.classList.remove('hovered')
        console.log('leave');
      }
      const dragDrop = function () {
        this.append(transfer)
        console.log('drop');
      }
      empty.addEventListener("dragover", dragOver)
      empty.addEventListener("dragenter", dragEnter)
      empty.addEventListener("dragleave", dragLeave)
      empty.addEventListener("drop", dragDrop)
  }
  
};



dragAndDrop();
