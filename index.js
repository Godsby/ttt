const Game = require('./game.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let init = function () {
  let game = new Game();
  rl.on('line', line => {
    if (game.isReady()) {
      let players = +line.trim();
      if (players >= 0 && players <= 2) {
        game.start(players);
      } else {
        game.promptPlayers();
      }
    } else {
      if (game.isActive() && game.isHumanTurn()) {
        let move = +line.trim();
        game.play(move);
      }
    }
  });
};

init();
