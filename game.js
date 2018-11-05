const Board = require('./board.js');
class Game {
  constructor() {
    this.restart();
  }

  play(move) {
    this.clear();
    this.isTileNumber(move) ? this.validate(move) : this.promptNumber();
    if (move === 99) {
      this.restart();
    }

    this.text += this.board.display();
    this.render();
  }

  clear() {
    this.text = '';
  }

  isTileNumber(move) {
    return typeof move === 'number' && (move > 0 && move < 10);
  }

  validate(tile) {
    this.board.isOpen(tile - 1)
      ? this.board.choose(tile - 1, 'X')
      : this.promptTile();
  }

  start(players) {
    this.active = true;
    this.players = players;
    this.ready = false;

    // console.log('@start:', this);
  }

  restart() {
    this.active = false;
    this.players = 0;
    this.board = new Board();
    this.ready = true;
    this.text = '';
    this.choose();
    this.render();
  }

  render() {
    console.clear();
    console.log(this.text);
  }

  choose() {
    this.text += `
Choose the number of players:
 [ 0 ] [ 1 ] [ 2 ] `;
  }

  promptPlayers() {
    this.choose();
    this.text += `
Please select 0 or 1 or 2.`;
    this.render();
  }

  promptNumber() {
    this.text += `
Please select a valid number between 1 & 9`;
  }

  promptTile() {
    this.text += `
Please select an open tile:
${this.board.getOpenTiles()}`;
  }

  isReady() {
    return this.ready;
  }

  isActive() {
    return this.active;
  }

  isHumanTurn() {
    console.log('is human turn');
    return true;
  }
}

module.exports = Game;
