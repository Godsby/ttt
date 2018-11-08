class State {
  constructor() {
    // this.players = 0;
    // this.board = new Board();
    // this.msg = new Msg();
    // this.pNow = 1;
    this.restart();
  }

  restart() {
    this.active = false;
    this.ready = true;
    this.over = false;
  }

  isReady() {
    return this.ready;
  }

  isActive() {
    return this.active;
  }

  isOver() {
    return this.over;
  }

  start() {
    this.active = true;
    this.ready = false;
    this.over = false;
  }
}

module.exports = State;
