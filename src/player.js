import { cellPos, cellSprite, isInRange } from './cell';
import { createChoices } from './choice';


export default function createPlayer() {
  const player = add([
    'player',
    cellSprite('base'),
    cellPos(7, 7),
    health(10),
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
      takeTurn() {
        const enemiesInRange = get('enemy').filter((enemy) =>
          isInRange(this.cell, enemy.cell, this.range)
        );

        if (enemiesInRange.length > 0) {
          enemiesInRange[0].takeDamage(this.damage);
        }
      },
    },
  ]);

  return player;
}
