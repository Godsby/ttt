class Board {
  constructor() {
    this.grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.gfx = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  }

  display() {
    let str = '';
    let gfx = this.gfx;
    this.grid.forEach((tile, i) => {
      str += `${typeof tile === 'number' ? gfx[i] : tile}`;
      if ((i + 1) % 3 !== 0) {
        str += `  | `;
      } else if (i + 1 < 9) {
        str += `
------------
`;
      }
    });
    return str;
  }

  isOpen(tile) {
    return typeof this.grid[tile] === 'number';
  }

  setTile(tile, player) {
    this.grid[tile] = player;
  }

  getOpenTiles() {
    return this.grid.filter(tile => typeof tile === 'number');
  }

  isWin() {
    let g = this.grid;
    return (
      (g[0] === g[1] && g[1] === g[2]) ||
      (g[3] === g[4] && g[4] === g[5]) ||
      (g[6] === g[7] && g[7] === g[8]) ||
      (g[0] === g[3] && g[3] === g[6]) ||
      (g[1] === g[4] && g[4] === g[7]) ||
      (g[2] === g[5] && g[5] === g[8]) ||
      (g[0] === g[4] && g[4] === g[8]) ||
      (g[2] === g[4] && g[4] === g[6])
    );
  }

  isTie() {
    return this.grid.every(tile => typeof tile !== 'number');
  }
}

module.exports = Board;
