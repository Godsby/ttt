const Player = require('./player.js');
const Ai = require('./ai.js');
const util = require('../../util/utils.js');

class Agents {
  constructor() {
    this.setPlayersCurrent();
  }

  setPlayersCurrent() {
    this.players = 0;
    this.current = 1;
  }

  setAgents(agents, game) {
    if (agents) {
      this.addAgent(agents, 0);
    }

    let ai = 2 - agents;
    //use const -> per evaluation cannot be changed
    //const cant change change what its pionting // TODO: //but can still change obj etc add keys etc
    if (ai) {
      this.addAgent(ai, 1);
    }

    if (ai === 2) {
      util.checkTurn(game);
    }
  }

  addAgent(agents, agentType) {
    for (let i = agents; i > 0; i--) {
      this.spawn(agentType);
    }
  }

  spawn(agentType) {
    let agentTypes = [Player, Ai];
    this.players++;
    let playerNum = this.players;
    this['p' + playerNum] = new agentTypes[agentType](playerNum);
  }

  switchPlayers() {
    this.current = this.current === 1 ? 2 : 1;
  }

  isHumanTurn() {
    return this['p' + this.current].human;
  }

  getWinner() {
    return this['p' + this.current].marker;
  }
}

module.exports = Agents;
