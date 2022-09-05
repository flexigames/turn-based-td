import { cellPos, cellSprite } from './cell';
import { createChoices } from './choice';
import { attackEnemies } from './helpers';

export default function createPlayer() {
  const player = add([
    'player',
    cellSprite('base'),
    cellPos(7, 7),
    health(10),
    attackEnemies(),
    {
      damage: 1,
      range: 1,
      xp: 0,
      LEVEL_CAP: 3,
      takeDamage(damage = 1) {
        shake(damage);
        this.hurt(damage);

        if (this.hp() <= 0) console.log('game over');
      },
      gainXp(xp = 1) {
        this.xp += xp;

        if (this.xp >= this.LEVEL_CAP) {
          this.levelUp();
        }
      },
      levelUp() {
        this.xp = 0;
        createChoices();
      },
    },
  ]);

  return player;
}
