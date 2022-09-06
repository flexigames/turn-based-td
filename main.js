import kaboom from 'kaboom';
import {
  cellSprite,
  CELL_COUNT,
  CELL_SIZE,
  getRandomBorderCell,
  pixelToCellPos,
} from './src/cell';
import { createChoices } from './src/choice';
import { spawnEnemy } from './src/enemy';
import { addGrid } from './src/grid';
import { getPlayer } from './src/helpers';
import createMenu from './src/menu';
import createPath from './src/path';
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

createPlayer();

const path = [vec2(0, 0), vec2(0, 4), vec2(7, 4), vec2(7, 7)];
createPath(path);
spawnEnemy(path[0]);

function endTurn() {
  const nextEnemies = get('enemy').filter((enemy) => !enemy.turnTaken);
  const nextTowers = get('tower').filter((tower) => !tower.turnTaken);
  const player = getPlayer();

  if (nextEnemies.length > 0) {
    nextEnemies[0].takeTurn(endTurn);
  } else if (nextTowers.length > 0) {
    nextTowers[0].takeTurn(endTurn);
  } else if (!player.turnTaken) {
    player.takeTurn(endTurn);
  } else {
    get('enemy').forEach((o) => (o.turnTaken = false));
    get('player').forEach((o) => (o.turnTaken = false));
    get('tower').forEach((o) => (o.turnTaken = false));
    spawnEnemy(path[0]);
  }
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
