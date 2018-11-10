const play = function (game, input) {
  if (input === 'quit' || game.state.isOver()) {
    game.boot();// console.log(game);
  } else if (game.state.isReady()) {
    validateInput(game, +input);
  } else if (isActiveHumanTurn(game)) {
    validateTurn(game, +input);
  }
};

const validateInput = function (game, input) {
  if (isValidInput(input)) {
    setActiveAgentsAndRender(game, input);
  } else {
    requestValidInput(game.msg);
  }
};

const isValidInput = function (input) {
  return isInteger(input) && input >= 0 && input <= 2;
};

const isInteger = function (input) {
  return !isNaN(input) && input % 1 === 0;
};

const setActiveAgentsAndRender = function (game, agents) {
  game.state.setActive();
  game.agents.setAgents(agents, game);
  game.msg.clear();
  let display = game.board.display();
  renderBoardDisplay(game.msg, display);
  // if (!game.agents.p1.human && !game.agents.p2.human) {
  //   checkTurn(game);
  // }
};

const renderBoardDisplay = function (msg, display) {
  msg.text += display;
  msg.render();
};

const requestValidInput = function (msg) {
  msg.clear();
  msg.noteSelectPlayers();
  msg.noteSelectValidOptions();
  msg.render();
};

const isActiveHumanTurn = function (game) {
  return game.state.isActive() && game.agents.isHumanTurn();
};

const validateTurn = function (game, input) {
  if (isValidTileNumber(input)) {
    validateTile(game, input);
  } else {
    requestValidTurn(game);
  }
};

const isValidTileNumber = function (input) {
  return isInteger(input) && isTileNumber(input);
};

const isTileNumber = function (input) {
  return input > 0 && input < 10;
};

const validateTile = function (game, input) {
  let tile = input - 1;
  if (game.board.isOpen(tile)) {
    update(game, tile);
  } else {
    requestValidTile(game);
  }
};

const update = function (game, tile) {
  let current = game.agents.current;
  let player = game.agents['p' + current].marker;
  game.board.setTile(tile, player);
  game.msg.clear();
  checkState(game);
};

const checkState = function (game) {
  if (game.board.isWin()) {
    win(game);
  } else if (game.board.isTie()) {
    tie(game);
  } else {
    game.agents.switchPlayers();
  }

  let display = game.board.display();
  renderBoardDisplay(game.msg, display);
  checkTurn(game);
  // console.log(game);
};

const checkTurn = function (game) {
  if (!game.agents.isHumanTurn()) {
    let openTiles = game.board.getOpenTiles();
    let current = game.agents.current;
    let ai = game.agents['p' + current];
    let tile = ai.generateTurn(openTiles);

    // console.log(`${ai.marker}  chose ${move} from ${openTiles}`);
    setTimeout(() => {
      // this.play(move);
      update(game, tile);
    }, 1200);
  }
};

const win = function (game) {
  let winner = game.agents.getWinner();
  game.msg.noteWin(winner);
  game.state.setOver();
};

const tie = function (game) {
  game.msg.noteTie();
  game.state.setOver();
};

const requestValidTurn = function (game) {
  game.msg.clear();
  game.msg.noteSelectValidNumber();
  let display = game.board.display();
  renderBoardDisplay(game.msg, display);
};

const requestValidTile = function (game) {
  game.msg.clear();
  let openTiles = game.board.getOpenTiles();
  game.msg.noteSelectValidTile(openTiles);
  let display = game.board.display();
  renderBoardDisplay(game.msg, display);
};

const requestPlayersAndRender = function (msg) {
  msg.clear();
  msg.noteSelectPlayers();
  msg.render();
};

module.exports = { play, requestPlayersAndRender, checkTurn };
