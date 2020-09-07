export default class Cell {
    set state(state) {
      this.alive = state;
      this.color = state ? 'black' : 'white';
      this.render();
    }

    constructor(coords, size, canvas, alive = false) {
    this.height = size;
    this.width = size;

    this.x = this.width * coords.x;
    this.y = this.height * coords.y;

    this.canvas = canvas
    this.state = alive;

    this.neighbors = [];
  }

  isAlive() {
    return this.alive;
  }

  isDead() {
    return !this.isAlive();
  }

  setAlive() {
    this.state = true;
  }

  setDead() {
    this.state = false;
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  render() {
    const context = this.canvas.getContext('2d');

    context.fillStyle = this.color;
    context.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  handleGenerationPass() {
    const alive = this.neighbors.filter(n => n.isAlive()).length;

    if (this.isAlive() && alive === 2 || alive === 3) {
      this.willDie = false;
    } else if (this.isDead() && alive === 3) {
      this.willDie = false;
    } else {
      this.willDie = true;  
    }
  }
}