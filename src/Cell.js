/**
 * Cell representation with two possible states: dead/alive.
 */
export default class Cell {
    constructor(coords, size, canvas) {
    this.height = size;
    this.width = size;

    // Allow only one cell per coordinate step.
    this.x = this.width * coords.x;
    this.y = this.height * coords.y;

    this.canvas = canvas;
    this.setDead();
    this.willDie = true;
    this.setDefaultTimeDead();

    this.neighbors = [];
  }

  isAlive() {
    return this.alive;
  }

  resetTimeDead() {
    this.timeDead = 0;
  }

  setTimeDead(value) {
    this.timeDead = value;
  }

  setDefaultTimeDead() {
    this.setTimeDead(5);
  }

  isDead() {
    return !this.isAlive();
  }

  setAlive() {
    this.alive = true;
    this.color = '#d4ee9f';
    this.resetTimeDead();
  }

  setDead() {
    this.alive = false;

    if (this.timeDead >= 0 && this.timeDead < 4) {
      this.color = '#a5c663';
    } else {
      this.color = '#354f00';
    }

    this.timeDead++;
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  // First, calculate wether the cell will live or die on the future generation.
  updateFutureState() {
    const alive = this.neighbors.filter(n => n.isAlive()).length;

    if (this.isAlive() && alive === 2 || alive === 3) {
      this.willDie = false;
    } else if (this.isDead() && alive === 3) {
      this.willDie = false;
    } else {
      this.willDie = true;
    }
  }

  // Taking the precalculated values, update the state and render it
  handleGenerationPass(canvas) {
    this.willDie ? this.setDead() : this.setAlive();

    this.render(canvas);
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = this.color;
    ctx.linecap = 'round';
    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  toggle() {
    this.setDefaultTimeDead();

    this.isDead() ? this.setAlive() : this.setDead();
  }
}