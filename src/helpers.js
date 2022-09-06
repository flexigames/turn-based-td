import { isInRange } from './cell';

export function getPlayer() {
  return get('player')[0];
}

export function attackEnemies() {
  return {
    range: 1,
    turnTaken: false,
    damage: 1,
    takeTurn(endTurn) {
      this.turnTaken = true;
      const enemiesInRange = get('enemy').filter((enemy) =>
        isInRange(this.cell, enemy.cell, this.range)
      );

      if (enemiesInRange.length > 0) {
        enemiesInRange[0].takeDamage(this.damage, endTurn);
      } else {
        endTurn();
      }
    },
  };
}
