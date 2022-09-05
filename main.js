import kaboom from 'kaboom';
import { forEach } from 'lodash';
import {
  cellPos,
  cellSprite,
  CELL_COUNT,
  CELL_SIZE,
  pixelToCellPos,
} from './src/cell';
import { createChoices } from './src/choice';
import { spawnEnemy } from './src/enemy';
import { addGrid } from './src/grid';
import { getPlayer } from './src/helpers';
import createMenu from './src/menu';
import createPlayer from './src/player';
import loadSprites from './src/spritesheet';
import createTower from './src/tower';

export const GRID_OFFSET_Y = 96;
export const TOTAL_GRID_SIZE = CELL_SIZE * CELL_COUNT;

kaboom({
  canvas: document.querySelector('#canvas'),
  width: TOTAL_GRID_SIZE,
  height: GRID_OFFSET_Y + TOTAL_GRID_SIZE,
  background: [0, 0, 0],
});

addGrid();

loadSprites();

createMenu();

spawnEnemy(7, 0);
spawnEnemy(9, 0);
spawnEnemy(5, 14);
spawnEnemy(14, 3);
spawnEnemy(0, 6);

createPlayer();

function endTurn() {
  const nextEnemies = get('enemy').filter((enemy) => !enemy.turnTaken);

  if (nextEnemies.length > 0) {
    nextEnemies[0].takeTurn(endTurn);
  } else {
    get('enemy').forEach((enemy) => (enemy.turnTaken = false));
    playerTurn();
  }
}

function playerTurn() {
  getPlayer().takeTurn();
  get('tower').forEach((tower) => tower.takeTurn());
}

let state = '';

onKeyPress('e', endTurn);
onMousePress((mousePos) => {
  if (state === 'building-tower') {
    createTower(pixelToCellPos(mousePos));
    destroyAll('building-indicator');
    state = '';
  }
});
onMouseMove((mousePos) => {
  if (state === 'building-tower') {
    get('building-indicator')[0].pos = vec2(
      pixelToCellPos(mousePos).x * CELL_SIZE,
      pixelToCellPos(mousePos).y * CELL_SIZE
    );
  }
});
onClick('end-turn-button', endTurn);

export function changeState(newState) {
  if (newState === 'building-tower') {
    add(['building-indicator', cellSprite('tower'), color(rgb(50, 50, 50))]);
  }
  state = newState;
}

createChoices();
