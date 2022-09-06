import { cellPos, cellSprite, isInRange } from './cell';
import { getTurn } from './helpers';
import createSoldier from './soldier';

export default function createBarracks(cell) {
  return add([
    'barracks',
    'friendly',
    cellPos(cell.x, cell.y),
    cellSprite('barracks'),
    {
      lastSoldier: null,
      turnTaken: false,
      spawnCooldown: 3,
      takeTurn(endTurn) {
        this.turnTaken = true;
        const spawnPoint = get('path-object').filter((pathObject) =>
          isInRange(this.cell, pathObject.cell, 1)
        )?.[0]?.cell;

        const isOnCooldown =
          getTurn() - this.lastSoldier?.deathTurn <= this.spawnCooldown;

        if (
          spawnPoint &&
          !this.lastSoldier?.exists() &&
          (!isOnCooldown || this.lastSoldier === null)
        ) {
          this.lastSoldier = createSoldier(spawnPoint);
        }

        endTurn();
      },
    },
  ]);
}
