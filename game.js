const Board = require('./board.js');
const Player = require('./player.js');
const Ai = require('./ai.js');
class Game {
  constructor() {
    this.restart();
  }

  play(move) {
    this.clear();
    if (move === 99) {
      this.restart();
    }

    this.isTileNumber(move) ? this.validate(move) : this.promptNumber();
  }

  clear() {
    this.text = '';
    this.note = '';
  }

  update() {
    this.text += this.board.display();
    this.render();
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
    this.board.isWin()
      ? this.win()
      : this.board.isTie()
        ? this.tie()
        : this.switchPlayers();
  }

  win() {
    let winner = this['p' + this.pNow].marker;
    this.note += `${winner} wins!
`;
    this.over = true;
    this.update();
  }

  tie() {
    this.note += `It's a tie!
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

    this.clear();
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
    this.ready = true;
    this.over = false;
    this.pNow = 1;
    this.clear();
    this.choose();
    this.render();
  }

  switchPlayers() {
    this.pNow = this.pNow === 1 ? 2 : 1;
    this.update();
  }

  isHumanTurn() {
    return this['p' + this.pNow].human;
  }

  render() {
    console.clear();
    console.log(`${this.text}
${this.note}`);
  }

  choose() {
    this.note += `Choose the number of players:
 [ 0 ] [ 1 ] [ 2 ]
`;
  }

  promptPlayers() {
    this.clear();
    this.choose();
    this.note += `Please select 0 or 1 or 2.
`;
    this.render();
  }

  promptNumber() {
    this.note += `
Please select a valid number between 1 & 9`;
    this.update();
  }

  promptTile() {
    this.note += `
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
