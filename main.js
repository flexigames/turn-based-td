import kaboom from 'kaboom';
import { CELL_COUNT, CELL_SIZE } from './src/cell';
import { spawnEnemy } from './src/enemy';
import { drawGrid } from './src/grid';
import createMenu from './src/menu';
import createPlayer from './src/player';
import loadSprites from './src/spritesheet';

export const GRID_OFFSET_Y = 96;
export const TOTAL_GRID_SIZE = CELL_SIZE * CELL_COUNT;

kaboom({
  canvas: document.querySelector('#canvas'),
  width: TOTAL_GRID_SIZE,
  height: GRID_OFFSET_Y + TOTAL_GRID_SIZE,
  background: [0, 0, 0],
});

loadSprites();

createMenu();

onDraw(() => {
  drawGrid();
});

spawnEnemy(7, 0);
spawnEnemy(9, 0);
const player = createPlayer();

function endTurn() {
  get('enemy').forEach((enemy) => enemy.turn(player));
}

onKeyPress('e', endTurn);
onClick('end-turn-button', endTurn);
