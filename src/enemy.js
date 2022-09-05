import { cellPos, cellPosToPixel, cellSprite, isCellOccupied } from './cell';
import { getPlayer } from './helpers';

export function spawnEnemy(cell) {
  const { x, y } = cell;
  return add([
    'enemy',
    cellSprite('enemy'),
    cellPos(x, y),
    {
      turnTaken: false,
      endTurnCb: null,
      moveToCell(x, y) {
        if (isCellOccupied(get('enemy'), x, y)) return;

        this.cell = vec2(x, y);
      },
      takeTurn(endTurnCb) {
        this.turnTaken = true;
        this.endTurnCb = endTurnCb;
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
      takeDamage() {
        this.color = RED;
        wait(0.2, () => {
          if (!this.exists()) return;
          this.destroy();
          getPlayer().gainXp();
        });
      },
      endTurn() {
        this.endTurnCb?.();
        this.endTurnCb = null;
      },
      update() {
        this.moveUpdate();
      },
      moveUpdate() {
        const moveAnmationFinished =
          this.pos.dist(cellPosToPixel(vec2(this.cell.x, this.cell.y))) === 0 &&
          this.turnTaken &&
          this.endTurnCb;

        if (moveAnmationFinished) {
          this.endTurn();
        }
        this.moveTo(cellPosToPixel(vec2(this.cell.x, this.cell.y)), 300);
      },
    },
  ]);
}
