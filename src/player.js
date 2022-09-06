import { cellPos, cellSprite } from './cell';
import { createChoices } from './choice';
import { attackEnemies } from './helpers';

export default function createPlayer() {
  const player = add([
    'player',
    'friendly',
    'attackable',
    cellSprite('base'),
    cellPos(7, 7),
    health(10),
    attackEnemies(),
    {
      xp: 0,
      levelCap: 3,
      takeDamage(damage = 1) {
        shake(damage * 10);
        this.hurt(damage);

        if (this.hp() <= 0) console.log('game over');
      },
      gainXp(xp = 1) {
        this.xp += xp;

        if (this.xp >= this.levelCap) {
          this.levelUp();
        }
      },
      levelUp() {
        this.xp = 0;
        this.levelCap *= 2;
        createChoices();
      },
    },
  ]);

  return player;
}
