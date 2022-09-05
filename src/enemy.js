import { damageBase } from '../main';
import { cellPos, cellSprite, CELL_SIZE } from './cell';

export function spawnEnemy(x, y) {
  return add([
    'enemy',
    cellSprite('enemy'),
    cellPos(x, y),
    {
      id: Math.random(),
      cell: vec2(x, y),
      moveToCell(x, y) {
        if (
          get('enemy').some((enemy) => enemy.cell.x === x && enemy.cell.y === y)
        )
          return;

        this.moveTo(x * CELL_SIZE, y * CELL_SIZE);
        this.cell = vec2(x, y);
      },
      damagePlayer() {
        damageBase();
        this.destroy();
      },
      turn(playerCell) {
        if (this.cell.x < playerCell.x)
          this.moveToCell(this.cell.x + 1, this.cell.y);
        else if (this.cell.x > playerCell.x)
          this.moveToCell(this.cell.x - 1, this.cell.y);
        else if (this.cell.y < playerCell.y)
          this.moveToCell(this.cell.x, this.cell.y + 1);
        else if (this.cell.y > playerCell.y)
          this.moveToCell(this.cell.x, this.cell.y - 1);

        if (this.cell.x === playerCell.x && this.cell.y === playerCell.y) {
          this.damagePlayer();
        }
      },
    },
  ]);
}
