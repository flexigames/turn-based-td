import { cellPos, cellSprite, isInRange } from './cell';
import createSoldier from './soldier';

export default function createBarracks(cell) {
  return add([
    'barracks',
    cellPos(cell.x, cell.y),
    cellSprite('barracks'),
    {
      add() {
        const spawnPoint = get('path-object').filter((pathObject) =>
          isInRange(this.cell, pathObject.cell, 1)
        )?.[0]?.cell;

        if (spawnPoint) {
          createSoldier(spawnPoint);
        }
      },
    },
  ]);
}
