const Agents = require('../lib/agent/agents.js');
const Board = require('../lib/board.js');
const Msg = require('../lib/msg.js');
const State = require('../lib/state.js');
const util = require('../util/utils.js');

class Game {
  constructor() {
    this.boot();
  }

  boot() {
    this.agents = new Agents();
    this.board = new Board();
    this.msg = new Msg();
    this.state = new State();
  }
}

module.exports = Game;
