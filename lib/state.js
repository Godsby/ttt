class State {
  constructor() {
    this.setReady();
    //per indepenent this.status => use strings
    //'isActive'\=> thus adding new state === adding new string
    //add helper function like agents.spawn()
    //etc;
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
