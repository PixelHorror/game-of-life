import World from './World.js';
import Input from './Input.js';
import State from './State.js';

const DEFAULTS = {
  world: {
    size: 640
  },
  cell: {
    size: 16
  }
};

const canvas = document.querySelector('canvas');
canvas.height = DEFAULTS.world.size;
canvas.width = DEFAULTS.world.size;

const button = document.querySelector('button');

const globalState = new State();
const input = new Input(canvas, button, DEFAULTS.cell.size);
const world = new World(DEFAULTS.world.size, DEFAULTS.cell.size);

// Run the simulation every 300ms
window.setInterval(() => world.advanceGeneration(globalState, canvas), 300);

// Run the rendering as fast as the browser can handle.
window.requestAnimationFrame(() => {
  world.render(canvas);
  input.update(globalState, world);
});