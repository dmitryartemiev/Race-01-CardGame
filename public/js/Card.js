// //создаем класс Карта
export default class Card {
  constructor(id, title, portrait, price, health, attack) {
    this.id = id;
    this.title = title;
    this.portrait = portrait;
    this.price = price;
    this.health = health;
    this.attack = attack;
  }
};
