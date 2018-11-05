class Board {
  constructor() {
    this.grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  display() {
    let str = '';
    this.grid.forEach((el, i) => {
      if ((i + 1) % 3 !== 0) {
        str += `i, isnt % 3`;
      } else {
        str += `
i, is % 3`;
      }
    });
    return str;
  }

  isOpen(tile) {
    return this.grid[tile] === 0;
  }

  choose(tile, player) {
    this.grid[tile] = player;
  }

  getOpenTiles() {
    return this.grid.map((el, i) => (el === 0 ? i + 1 : el));
  }
}

module.exports = Board;
