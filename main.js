import kaboom from 'kaboom';
import { sample } from 'lodash';
import createBarracks from './src/barracks';
import { cellSprite, CELL_COUNT, CELL_SIZE, pixelToCellPos } from './src/cell';
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

const possiblePaths = [
  [vec2(0, 0), vec2(0, 4), vec2(7, 4), vec2(7, 7)],
  [vec2(14, 12), vec2(14, 10), vec2(10, 10), vec2(10, 7), vec2(7, 7)],
  [vec2(3, 14), vec2(7, 14), vec2(7, 8), vec2(7, 7)],
];

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
  if (state.includes('building')) {
    if (state.includes('tower')) {
      createTower(pixelToCellPos(mousePos));
    } else if (state.includes('barracks')) {
      createBarracks(pixelToCellPos(mousePos));
    }
    destroyAll('building-indicator');
    state = '';
  }
});
onMouseMove((mousePos) => {
  if (state.includes('building')) {
    get('building-indicator')[0].pos = vec2(
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
      cellSprite(newState.split('-')[1]),
      color(rgb(50, 50, 50)),
    ]);
  }
  state = newState;
}

createChoices();
