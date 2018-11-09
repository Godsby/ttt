class Player {
  constructor(player) {
    let markers = ['😘', '🤗'];
    // let markers = ['X', 'O'];
    this.player = player;
    this.human = true;
    this.marker = markers[player - 1];
  }
}

module.exports = Player;
