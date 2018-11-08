const Game = require('./src/game.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let init = function () {
  let game = new Game();
  rl.on('line', input => {
    if (game.isOver()) {
      game.restart();
    } else if (game.isReady()) {
      let players = +input.trim();
      if (players >= 0 && players <= 2) {
        game.start(players);
      } else {
        game.promptPlayers();
      }
    } else {
      if (game.isActive() && game.isHumanTurn()) {
        let move = +input.trim();
        game.play(move);
      }
    }
  });
};

init();
