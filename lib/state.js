class State {
  constructor() {
    this.setReady();
  }

  setActive() {
    this.active = true;
    this.over = false;
    this.ready = false;
  }

  setReady() {
    this.ready = true;
    this.active = false;
    this.over = false;
  }

  setOver() {
    this.over = true;
    this.active = false;
    this.ready = false;
  }

  isActive() {
    return this.active;
  }

  isOver() {
    return this.over;
  }

  isReady() {
    return this.ready;
  }
}

module.exports = State;
