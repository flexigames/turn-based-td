import { cellPos, cellSprite } from './cell';
import { attackEnemies } from './helpers';

export default function createSoldier(cell) {
  add([
    'soldier',
    'friendly',
    'attackable',
    cellPos(cell.x, cell.y),
    cellSprite('soldier'),
    attackEnemies(),
    health(4),
    {
      takeDamage(damage = 1) {
        this.hurt(damage);

        if (this.hp() <= 0) this.destroy();
      },
    },
  ]);
}
