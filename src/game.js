const Board = require('./board.js');
const Msg = require('./msg.js');
const Player = require('./player.js');
const Ai = require('./ai.js');
class Game {
  constructor() {
    this.restart();
  }

  play(move) {
    this.msg.clear();
    if (move === 99) {
      this.restart();
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
    this.over = true;
    this.update();
  }

  tie() {
    this.msg.note += `It's a tie!
`;
    this.over = true;
    this.update();
  }

  start(players) {
    this.active = true;
    this.ready = false;
    this.over = false;
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

  restart() {
    this.active = false;
    this.players = 0;
    this.board = new Board();
    this.msg = new Msg();
    this.ready = true;
    this.over = false;
    this.pNow = 1;
    this.msg.restart();
  }

  switchPlayers() {
    this.pNow = this.pNow === 1 ? 2 : 1;
    this.update();
  }

  isHumanTurn() {
    return this['p' + this.pNow].human;
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

  isReady() {
    return this.ready;
  }

  isActive() {
    return this.active;
  }

  isOver() {
    return this.over;
  }
}

module.exports = Game;
