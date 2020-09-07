export default class Input {
  constructor(canvas, button, cellSize) {
    this.canvas = canvas;
    this.button = button;
    this.cellSize = cellSize;

    this.button.addEventListener('click', click => this.onButtonPress(click));
    this.canvas.addEventListener('mousedown', click => this.onCanvasPress(click));

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
  
    this.canvasPress.x = Math.floor((clientX - boundBox.left) / this.cellSize, 10);
    this.canvasPress.y = Math.floor((clientY - boundBox.top) / this.cellSize, 10);
  }

  update(globalState, world) {
    if (this.buttonPress) {
      this.updateButton(globalState);
      this.buttonPress = null;
    }

    if (this.canvasPress.x && this.canvasPress.y) {
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