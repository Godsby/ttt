class Msg {
  constructor() {
    this.restart();
  }

  clear() {
    this.text = '';
    this.note = '';
  }

  setup() {
    this.note += `Choose the number of players:
 [ 0 ] [ 1 ] [ 2 ]
`;
  }

  render() {
    console.clear();
    console.log(`${this.text}
${this.note}`);
  }

  promptPlayers() {
    this.clear();
    this.setup();
    this.note += `Please select 0 or 1 or 2.
`;
    this.render();
  }

  promptNumber() {
    this.note += `
Please select a valid number between 1 & 9`;
  }

  restart() {
    this.clear();
    this.setup();
    this.render();
  }
}

module.exports = Msg;
