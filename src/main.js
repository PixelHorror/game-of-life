import Cell from './Cell.js';

const DEFAULTS = {
  world: {
    size: 640
  },
  cell: {
    size: 16
  }
};

let started = false;
const canvas = document.querySelector('canvas');
let world = [];
const size = DEFAULTS.world.size / DEFAULTS.cell.size;

for (let h = 0; h < size; h++) {
  let level = [];
  for (let w = 0; w < size; w++) {
    const newCell = new Cell({ x: h, y: w }, DEFAULTS.cell.size, canvas);
    level.push(newCell);
  }
  world.push(level);
}

for (let h = 0; h < size; h++) {
  for (let w = 0; w < size; w++) {
    const cell = world[h][w];
    const neighbors = getNeighbors(h, w);
    cell.setNeighbors(neighbors);
  }
}

function getNeighbors(x, y) {
  const l = getAt(x - 1, y);
  const r = getAt(x + 1, y);
  const b = getAt(x, y + 1);
  const t = getAt(x, y - 1);
  const br = getAt(x + 1, y + 1);
  const bl = getAt(x - 1, y + 1);
  const tr = getAt(x + 1, y - 1);
  const tl = getAt(x - 1, y - 1);

  const n = [l, r, b, t, br, bl, tr, tl].filter(Boolean);
  return n;
}

function getAt(x, y) {
  if (x < 0 || y < 0 || y == size || x == size) {
    return undefined;
  }

  return world[x][y];
}

canvas.height = DEFAULTS.world.size;
canvas.width = DEFAULTS.world.size;

const button = document.querySelector('button');

button.addEventListener('click', click => handleClick(click));

function handleClick(click) {
  const button = click.target;

  click.preventDefault();

  started = !started;

  started ? button.textContent = 'Pause' : button.textContent = 'Start';
}

let generationCount = 0;
let interval = window.setInterval(advanceGeneration, 300);

function advanceGeneration() {
  if (started) {
    generationCount++;
    for (let h = 0; h < size; h++) {
      for (let w = 0; w < size; w++) {
        const cell = world[h][w];
        cell.handleGenerationPass();
      }
    }

    for (let h = 0; h < size; h++) {
      for (let w = 0; w < size; w++) {
        const cell = world[h][w];
        cell.willDie ? cell.setDead() : cell.setAlive();
      }
    }
  }
}

function handleMouseDown(click) {
  const boundBox = click.target.getBoundingClientRect();
  const { clientX, clientY } = click;

  let clicked = {}
  clicked.x = Math.floor((clientX - boundBox.left) / DEFAULTS.cell.size, 10);
  clicked.y = Math.floor((clientY - boundBox.top) / DEFAULTS.cell.size, 10);

  const evt = new CustomEvent('onCellAdd', { detail: clicked });
  canvas.dispatchEvent(evt);
}

function spawnCell(evt) {
  const coords = evt.detail;
  const cell = world[coords.x][coords.y];
  evt.stopPropagation();

  if (cell.isAlive()) {
    cell.setDead();
  } else {
    cell.setAlive();
  }
}

canvas.addEventListener('mousedown', click => handleMouseDown(click));
canvas.addEventListener('onCellAdd', evt => spawnCell(evt));
