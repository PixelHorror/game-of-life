/**
 * Handles Input and DOM Interaction
 */
export default class Input {
  constructor(canvas, button, cellSize) {
    this.canvas = canvas;
    this.button = button;
    this.cellSize = cellSize;

    this.button.addEventListener('click', click => this.onButtonPress(click));
    this.canvas.addEventListener('mousedown', click => this.onCanvasPress(click));
    this.generation = this.canvas.parentElement.querySelector('.generation h3');

    this.buttonPress = false;
    this.canvasPress = {};
  }

  onButtonPress(click) {
    click.preventDefault();
    this.buttonPress = true;
  }

  onCanvasPress(click) {
    const boundBox = click.target.getBoundingClientRect();
    const { clientX, clientY } = click;

    click.preventDefault();
  
    // Values are scaled per cell width/height value
    this.canvasPress.x = Math.floor((clientX - boundBox.left) / this.cellSize, 10);
    this.canvasPress.y = Math.floor((clientY - boundBox.top) / this.cellSize, 10);
  }

  update(globalState, world) {
    if (globalState.isRunning()) {
      this.generation.innerText = `Current Generation: ${world.generation}`;
    }

    // Do we have pending inputs to resolve?
    if (this.buttonPress) {
      this.updateButton(globalState);
      this.buttonPress = null;
    }

    if (Number.isInteger(this.canvasPress.x) && Number.isInteger(this.canvasPress.y)) {
      world.toggleAt(this.canvasPress.x, this.canvasPress.y);
      this.canvasPress = {};
    }

    window.requestAnimationFrame(() => this.update(globalState, world));
  }

  updateButton(globalState) {
    globalState.toggle();
    globalState.isRunning() ? this.button.textContent = 'Pause' : this.button.textContent = 'Start';
  }
}