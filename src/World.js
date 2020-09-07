import Cell from './Cell.js';

export default class World {
  constructor(worldSize, cellSize) {
    this.size = worldSize / cellSize;
    this.cellSize = cellSize;
    this.cells = [];
    this.generation = 0;

    this.fill();
  }

  // Called everytime a new generation arrives, updates all the future states
  // and renders them as well.
  advanceGeneration(globalState, canvas) {
    if (globalState.isRunning()) {
      this.generation++;

      const allCells = this.getFlat();
      allCells.forEach(c => c.updateFutureState());
      allCells.forEach(c => c.handleGenerationPass(canvas));
    }
  }

  // Builds the initial state of the matrix and sets neighbors per cell.
  fill() {
    for (let h = 0; h < this.size; h++) {
      let level = [];
      for (let w = 0; w < this.size; w++) {
        const newCell = new Cell({ x: h, y: w }, this.cellSize);
        level.push(newCell);
      }
      this.cells.push(level);
    }

    for (let h = 0; h < this.size; h++) {
      for (let w = 0; w < this.size; w++) {
        const cell = this.getAt(h, w);
        const neighbors = this.getNeighbors(h, w);
        cell.setNeighbors(neighbors);
      }
    }
  }

  render(canvas) {
    this.getFlat().forEach(c => c.render(canvas));
    window.requestAnimationFrame(() => this.render(canvas));
  }

  getFlat() {
    return this.cells.flat();
  }

  getAt(x, y) {
    if (x < 0 || y < 0 || y == this.size || x == this.size) {
      return undefined;
    }
  
    return this.cells[x][y];
  }

  getNeighbors(x, y) {
    const l = this.getAt(x - 1, y);
    const r = this.getAt(x + 1, y);
    const b = this.getAt(x, y + 1);
    const t = this.getAt(x, y - 1);
    const br = this.getAt(x + 1, y + 1);
    const bl = this.getAt(x - 1, y + 1);
    const tr = this.getAt(x + 1, y - 1);
    const tl = this.getAt(x - 1, y - 1);
  
    const neighbors = [l, r, b, t, br, bl, tr, tl].filter(Boolean);
    return neighbors;
  }

  toggleAt(x, y) {
    const cell = this.getAt(x, y);
    cell.toggle();
  }
}