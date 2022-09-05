import { cellPos, cellSprite } from './cell';

export default function createPlayer() {
  const player = add([
    'player',
    cellSprite('base'),
    cellPos(7, 7),
    health(10),
    {
      takeDamage(damage = 1) {
        shake(damage);
        this.hurt(damage);

        if (this.hp() <= 0) console.log('game over');
      },
    },
  ]);

  return player;
}
