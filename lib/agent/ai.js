class Ai {
  constructor(player) {
    let markers = ['🖥', '🕹'];
    // let markers = ['X', 'O'];
    this.player = player;
    this.human = false;
    this.marker = markers[player - 1];
  }

  generateTurn(openTiles) {
    return openTiles[Math.floor(Math.random() * openTiles.length)];
  }
}

module.exports = Ai;
