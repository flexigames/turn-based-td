import {
  cellPos,
  cellPosToPixel,
  cellSprite,
  isCellOccupied,
  isInRange,
} from './cell';
import { getPlayer } from './helpers';

export function spawnEnemy(
  path,
  { initialHealth = 2, damage = 1, sprite = 'enemy' } = {}
) {
  const { x, y } = path[0];
  return add([
    'enemy',
    cellSprite(sprite),
    cellPos(x, y),
    health(initialHealth),
    {
      turnTaken: false,
      endTurnCb: null,
      path,
      nextPathStep: 1,
      damage,
      moveToCell(x, y) {
        if (isCellOccupied(get('enemy'), x, y)) return;

        this.cell = vec2(x, y);
      },
      takeTurn(endTurnCb) {
        this.turnTaken = true;
        this.endTurnCb = endTurnCb;

        const attackableFriendly = get(['friendly', 'attackable']).filter(
          (friendly) => isInRange(this.cell, friendly.cell, 1)
        )?.[0];

        if (attackableFriendly) {
          attackableFriendly.takeDamage(this.damage);
          return;
        }

        if (this.cell.dist(path[this.nextPathStep]) === 0) {
          this.nextPathStep++;
        }

        this.moveCloserTo(path[this.nextPathStep]);
      },
      moveCloserTo({ x, y }) {
        const distanceX = this.cell.x - x;
        const distanceY = this.cell.y - y;
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
          if (this.cell.x < x) this.moveToCell(this.cell.x + 1, this.cell.y);
          else if (this.cell.x > x)
            this.moveToCell(this.cell.x - 1, this.cell.y);
        } else {
          if (this.cell.y < y) this.moveToCell(this.cell.x, this.cell.y + 1);
          else if (this.cell.y > y)
            this.moveToCell(this.cell.x, this.cell.y - 1);
        }
      },
      takeDamage(damage = 1, next) {
        this.color = RED;
        this.hurt(damage);

        wait(0.2, () => {
          if (!this.exists()) return;
          if (this.hp() <= 0) {
            this.destroy();
            getPlayer().gainXp();
          } else {
            this.color = WHITE;
          }
          next?.();
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
        this.moveTo(cellPosToPixel(vec2(this.cell.x, this.cell.y)));
      },
    },
  ]);
}
