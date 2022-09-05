import { isInRange } from "./cell";

export function getPlayer() {
  return get('player')[0];
}

export function attackEnemies() {
  return ({
    range: 1,
    takeTurn() {
      const enemiesInRange = get('enemy').filter((enemy) =>
        isInRange(this.cell, enemy.cell, this.range)
      );

      if (enemiesInRange.length > 0) {
        enemiesInRange[0].takeDamage(this.damage);
      }
    },
  });
}
