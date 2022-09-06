import { cellPos, cellSprite } from './cell';
import { attackEnemies, getTurn } from './helpers';

export default function createSoldier(cell) {
  return add([
    'soldier',
    'friendly',
    'attackable',
    cellPos(cell.x, cell.y),
    cellSprite('soldier'),
    attackEnemies(),
    health(5),
    {
      deathTurn: null,
      takeDamage(damage = 1) {
        this.hurt(damage);

        if (this.hp() <= 0) {
          this.deathTurn = getTurn();
          this.destroy();
        }
      },
    },
  ]);
}
