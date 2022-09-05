import { cellPos, cellPosToPixel, cellSprite, isCellOccupied } from './cell';

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
      damagePlayer(player) {
        player.takeDamage();
        this.destroy();
      },
      turn(player) {
        const { x: playerX, y: playerY } = player.cell;
        if (this.cell.x < playerX)
          this.moveToCell(this.cell.x + 1, this.cell.y);
        else if (this.cell.x > playerX)
          this.moveToCell(this.cell.x - 1, this.cell.y);
        else if (this.cell.y < playerY)
          this.moveToCell(this.cell.x, this.cell.y + 1);
        else if (this.cell.y > playerY)
          this.moveToCell(this.cell.x, this.cell.y - 1);

        if (this.cell.x === playerX && this.cell.y === playerY) {
          this.damagePlayer(player);
        }
      },
    },
  ]);
}
