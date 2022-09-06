import { cellPos, cellSprite } from './cell';
import { attackEnemies } from './helpers';

export default function createSoldier(cell) {
  add([
    'soldier',
    cellPos(cell.x, cell.y),
    cellSprite('soldier'),
    attackEnemies(),
  ]);
}
