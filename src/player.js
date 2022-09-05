import { cellPos, cellSprite, isInRange } from './cell';

export default function createPlayer() {
  const player = add([
    'player',
    cellSprite('base'),
    cellPos(7, 7),
    health(10),
    {
      damage: 1,
      range: 1,
      takeDamage(damage = 1) {
        shake(damage);
        this.hurt(damage);

        if (this.hp() <= 0) console.log('game over');
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
