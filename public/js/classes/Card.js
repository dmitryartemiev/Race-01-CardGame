// //создаем класс Карта
class Card {
  constructor(id, title, portrait, price, health, attack, position) {
    this.id = id;
    this.title = title;
    this.portrait = portrait;
    this.price = price;
    this.health = health;
    this.attack = attack;
    this.position = position;
  }
  move(){
      console.log(this);
  }

};


export default Card;