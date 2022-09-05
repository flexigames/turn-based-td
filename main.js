import kaboom from 'kaboom';
import { cellPos, cellSprite, CELL_COUNT, CELL_SIZE } from './src/cell';
import { spawnEnemy } from './src/enemy';
import { drawGrid } from './src/grid';
import loadSprites from './src/spritesheet';

kaboom({
  canvas: document.querySelector('#canvas'),
  width: CELL_SIZE * CELL_COUNT,
  height: CELL_SIZE * CELL_COUNT,
  background: [0, 0, 0],
});

loadSprites();

onDraw(() => {
  drawGrid();
});

spawnEnemy(7, 0);
spawnEnemy(9, 0);
add([cellSprite('base'), cellPos(7, 7)]);

function endTurn() {
  get('enemy').forEach((enemy) => enemy.turn(vec2(7, 7)));
}

onKeyPress('e', endTurn);

let lives = 3;

export function damageBase(damage = 3) {
  lives -= damage;
  shake(damage * 1);

  if (lives === 0) {
    console.log('game over');
  }
}
