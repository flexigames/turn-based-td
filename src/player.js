import { cellPos, cellSprite } from './cell';

export default function createPlayer() {
  const player = add([
    cellSprite('base'),
    cellPos(7, 7),
    health(3),
    {
      takeDamage(damage = 2) {
        shake(damage);
        this.hurt(damage);

        if (this.hp() <= 0) console.log('game over');
      },
    },
  ]);

  return player;
}
