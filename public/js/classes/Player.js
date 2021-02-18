import Deck from "./Deck.js";
import Hand from "./Hand.js";
import cards from "../script.js";
import shuffle from "../shuffle.js";
import Playground from "./Playground.js";

class Player {
  constructor(login, password,position, hp = 10, deck, hand, playground, turn, coins, coinsMax ) {
    this.login = login;
    this.password = password;
    this.position = position;
    this.hp = hp;
    this.deck = deck;
    this.hand = hand;
    this.playground = playground;
    this.turn = turn;
    this.coins = coins;
    this.coinsMax = coinsMax;
  }
  addDeckToPlayer() {
    this.deck = new Deck();
    this.deck = [];
    shuffle(cards);
    cards.forEach((item) => {
      item.position = `${this.login} deck`;
      this.deck.push(item);
    });
    return this.deck;
  }
  addHand() {
    this.hand = new Hand();
    return (this.hand = []);
  }
  addCardToHand() {
    if (this.hand.length <= 6) {
      this.deck[0].position = `${this.login} hand`;
      this.hand.push(this.deck[0]);
      this.deck.splice(0, 1);
      return this.hand;
    }
  }
  addPlayground() {
    this.playground = new Playground();
    return (this.playground = []);
  }

}

export default Player;
