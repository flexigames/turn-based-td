import kaboom from 'kaboom';
import { sample } from 'lodash';
import createBarracks from './src/barracks';
import {
  cellSprite,
  CELL_COUNT,
  CELL_SIZE,
  isInRange,
  pixelToCellPos,
} from './src/cell';
import { createChoices } from './src/choice';
import { spawnEnemy } from './src/enemy';
import { addGrid } from './src/grid';
import createMenu from './src/menu';
import createPath from './src/path';
import createPlayer from './src/player';
import loadSprites from './src/spritesheet';
import createTower from './src/tower';
import { generatePathPoints } from './src/path';

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

const possiblePaths = [generatePathPoints()];

const pathIndices = [sample(possiblePaths.map((_, i) => i))];

createPath(possiblePaths[pathIndices[0]]);
spawnEnemy(possiblePaths[pathIndices[0]]);

const game = add([
  'game',
  {
    turn: 1,
    incrementTurn() {
      this.turn++;
    },
  },
]);

const spawnRate = 2;
const bruteSpawnRate = 4;
const pathSpawnRate = 20;

function endTurn() {
  const nextEnemies = get('enemy').filter((enemy) => !enemy.turnTaken);
  const nextFriendlies = get('friendly').filter(
    (friendly) => !friendly.turnTaken
  );

  if (nextEnemies.length > 0) {
    nextEnemies[0].takeTurn(endTurn);
  } else if (nextFriendlies.length > 0) {
    nextFriendlies[0].takeTurn(endTurn);
  } else {
    get('enemy').forEach((o) => (o.turnTaken = false));
    get('friendly').forEach((o) => (o.turnTaken = false));
    spawnEnemies();
    spawnPath();
    game.turn++;
  }
}

function spawnPath() {
  if (game.turn % pathSpawnRate === 0) {
    const newPathIndex = sample(
      possiblePaths
        .map((_, i) => i)
        .filter((pathIndex) => !pathIndices.includes(pathIndex))
    );

    if (newPathIndex !== undefined) {
      pathIndices.push(newPathIndex);
      createPath(possiblePaths[newPathIndex]);
    }
  }
}

function spawnEnemies() {
  pathIndices.forEach((pathIndex) => {
    const path = possiblePaths[pathIndex];
    if (game.turn > 10 && game.turn % bruteSpawnRate === 0) {
      spawnEnemy(path, {
        initialHealth: 6,
        damage: 2,
        sprite: 'brute',
      });
    } else if (game.turn % spawnRate === 0) {
      spawnEnemy(path);
    }
  });
}

let state = '';

onKeyPress('e', endTurn);

onMousePress((mousePos) => {
  const mouseCell = pixelToCellPos(mousePos);
  if (state.includes('building')) {
    if (state.includes('tower')) {
      createTower(mouseCell);
    } else if (state.includes('barracks')) {
      createBarracks(mouseCell);
    }
  }
  if (state === 'spell-fireball') {
    get('enemy')
      .filter(({ cell }) => isInRange(cell, mouseCell, 2))
      .forEach((enemy) => enemy.takeDamage(10));
  }
  destroyAll('indicator');

  state = '';
});
onMouseMove((mousePos) => {
  if (state.includes('building')) {
    get('building-indicator')[0].pos = vec2(
      pixelToCellPos(mousePos).x * CELL_SIZE,
      pixelToCellPos(mousePos).y * CELL_SIZE
    );
  } else if (state === 'spell-fireball') {
    get('fireball-indicator')[0].pos = vec2(
      pixelToCellPos(mousePos).x * CELL_SIZE,
      pixelToCellPos(mousePos).y * CELL_SIZE
    );
  }
});
onClick('end-turn-button', endTurn);

export function changeState(newState) {
  if (newState.includes('building')) {
    add([
      'building-indicator',
      'indicator',
      cellSprite(newState.split('-')[1]),
      color(rgb(50, 50, 50)),
    ]);
  } else if (newState === 'spell-fireball') {
    add([
      'fireball-indicator',
      'indicator',
      cellSprite('fireball'),
      color(rgb(200, 50, 50)),
    ]);
  }
  state = newState;
}

// createChoices();
