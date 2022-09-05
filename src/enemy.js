import { cellPos, cellPosToPixel, cellSprite, isCellOccupied } from './cell';
import { getPlayer } from './helpers';

export function spawnEnemy(x, y) {
  return add([
    'enemy',
    cellSprite('enemy'),
    cellPos(x, y),
    {
      moveToCell(x, y) {
        if (isCellOccupied(get('enemy'), x, y)) return;

        this.moveTo(cellPosToPixel(vec2(x, y)));
        this.cell = vec2(x, y);
      },
      takeTurn() {
        const player = getPlayer();
        const { x: playerX, y: playerY } = player.cell;

        const distanceX = this.cell.x - playerX;
        const distanceY = this.cell.y - playerY;

        if (Math.abs(distanceX) + Math.abs(distanceY) === 1) {
          player.takeDamage();
          return;
        }

        if (Math.abs(distanceX) > Math.abs(distanceY)) {
          if (this.cell.x < playerX)
            this.moveToCell(this.cell.x + 1, this.cell.y);
          else if (this.cell.x > playerX)
            this.moveToCell(this.cell.x - 1, this.cell.y);
        } else {
          if (this.cell.y < playerY)
            this.moveToCell(this.cell.x, this.cell.y + 1);
          else if (this.cell.y > playerY)
            this.moveToCell(this.cell.x, this.cell.y - 1);
        }
      },
    },
  ]);
}
