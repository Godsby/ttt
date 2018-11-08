const Game = require('./src/game.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let init = function () {
  let game = new Game();
  rl.on('line', input => {
    if (game.state.isOver()) {
      game.setup();
    } else if (game.state.isReady()) {
      game.setPlayers(+input.trim());
    } else if (game.isTurn()) {
      game.play(+input.trim());
    }
  });
};

init();
