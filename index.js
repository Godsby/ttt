const readline = require('readline');
const Game = require('./app/game.js');
const util = require('./util/utils.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const init = function () {
  let game = new Game();
  rl.on('line', input => {
    util.play(game, input.trim());
  });
};

init();
