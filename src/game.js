const State = require('./state.js');
const Board = require('./board.js');
const Msg = require('./msg.js');
const Player = require('./player.js');
const Ai = require('./ai.js');
class Game {
  constructor() {
    this.setup();
  }

  play(move) {
    this.msg.clear();
    if (move === 99) {
      this.setup();
    }

    this.isTileNumber(move) ? this.validate(move) : this.promptNumber();
  }

  update() {
    this.msg.text += this.board.display();
    this.msg.render();
  }

  isTileNumber(move) {
    return typeof move === 'number' && (move > 0 && move < 10);
  }

  validate(move) {
    this.board.isOpen(move - 1) ? this.move(move - 1) : this.promptTile();
  }

  move(tile) {
    let player = this['p' + this.pNow].marker;
    this.board.choose(tile, player);
    this.board.isWin() ?
      this.win() :
      this.board.isTie() ?
      this.tie() :
      this.switchPlayers();
  }

  win() {
    let winner = this['p' + this.pNow].marker;
    this.msg.note += `${winner} wins!
`;
    this.state.over = true;
    this.update();
  }

  tie() {
    this.msg.note += `It's a tie!
`;
    this.state.over = true;
    this.update();
  }

  start(players) {
    // this.active = true;
    // this.ready = false;
    // this.over = false;
    this.state.start();
    players ? this.init(players) : this.spawn(2);
  }

  init(players) {
    for (let i = players; i > 0; i--) {
      let player = this.addPlayer();
      this['p' + player] = new Player(player);
    }

    let ai = 2 - players;
    if (ai) {
      this.spawn(ai);
    }

    this.msg.clear();
    this.update();
  }

  addPlayer() {
    this.players++;
    return this.players;
  }

  spawn(ai) {
    for (let i = ai; i > 0; i--) {
      let player = this.addPlayer();
      this['p' + player] = new Ai(player);
    }
  }

  setup() {
    // this.active = false;
    this.state = new State();
    this.players = 0;
    this.board = new Board();
    this.msg = new Msg();
    // this.ready = true;
    // this.over = false;
    this.pNow = 1;
    console.log(this);
  }

  switchPlayers() {
    this.pNow = this.pNow === 1 ? 2 : 1;
    this.update();
  }

  isTurn() {
    return this.state.isActive() && this.isHumanTurn();
  }

  isHumanTurn() {
    return this['p' + this.pNow].human;
  }

  setPlayers(players) {
    if (players >= 0 && players <= 2) {
      this.start(players);
    } else {
      this.promptPlayers();
    }
  }

  promptNumber() {
    this.msg.promptNumber();
    this.update();
  }

  promptTile() {
    this.msg.note += `
Please select an open tile:
${this.board.getOpenTiles()}`;
    this.update();
  }
}

module.exports = Game;
