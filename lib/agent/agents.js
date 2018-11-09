const Player = require('./player.js');
const Ai = require('./ai.js');

class Agents {
  constructor() {
    this.setPlayersCurrent();
  }

  setPlayersCurrent() {
    this.players = 0;
    this.current = 1;
  }

  setAgents(agents) {
    if (agents) {
      this.addAgent(agents, 0);
    }

    let ai = 2 - agents;
    if (ai) {
      this.addAgent(ai, 1);
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
