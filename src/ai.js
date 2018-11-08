class Ai {
  constructor(player) {
    let markers = ['X', 'O'];
    this.player = player;
    this.human = false;
    this.marker = markers[player - 1];
  }
}

module.exports = Ai;
