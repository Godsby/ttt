const util = require('../util/utils.js');

class Msg {
  constructor() {
    util.requestPlayersAndRender(this);
  }

  clear() {
    this.text = '';
    this.note = '';
  }

  noteSelectPlayers() {
    this.note += `Select the number of players:
 [ 0 ] [ 1 ] [ 2 ]
`;
  }

  noteSelectValidOptions() {
    this.note += `Please select 0 or 1 or 2.
`;
  }

  noteSelectValidTile(openTiles) {
    this.note += `
Please select an open tile:
${openTiles}`;
  }

  noteSelectValidNumber() {
    this.note += `
Please select a valid number between 1 & 9`;
  }

  noteTie() {
    this.note += `It's a tie!
`;
  }

  noteWin(winner) {
    this.note += `${winner} wins!
`;
  }

  render() {
    console.clear();
    console.log(`${this.text}
${this.note}`);
  }
}

module.exports = Msg;
