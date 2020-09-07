export default class Cell {
    constructor(coords, size, canvas) {
    this.height = size;
    this.width = size;

    this.x = this.width * coords.x;
    this.y = this.height * coords.y;

    this.canvas = canvas;
    this.setDead();
    this.willDie = true;

    this.neighbors = [];
  }

  isAlive() {
    return this.alive;
  }

  isDead() {
    return !this.isAlive();
  }

  setAlive() {
    this.alive = true;
    this.color = '#d4ee9f';
  }

  setDead() {
    this.alive = false;
    this.color = '#7b9f35';
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  setFuture() {
    const alive = this.neighbors.filter(n => n.isAlive()).length;

    if (this.isAlive() && alive === 2 || alive === 3) {
      this.willDie = false;
    } else if (this.isDead() && alive === 3) {
      this.willDie = false;
    } else {
      this.willDie = true;
    }
  }

  handleGenerationPass(canvas) {
    this.willDie ? this.setDead() : this.setAlive();
    this.render(canvas);
  }

  render(canvas) {
    const context = canvas.getContext('2d');

    context.fillStyle = this.color;
    context.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  toggle() {
    this.isDead() ? this.setAlive() : this.setDead();
  }
}