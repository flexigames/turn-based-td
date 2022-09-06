import { cellPos, cellSprite } from './cell';
import { attackEnemies } from './helpers';

export default function createTower(cell) {
  return add([
    'tower',
    'friendly',
    cellPos(cell.x, cell.y),
    cellSprite('tower'),
    attackEnemies(),
  ]);
}
