import { TOTAL_GRID_SIZE } from '../main';
import { getPlayer } from './helpers';

export default function createMenu() {
  add([
    'end-turn-button',
    pos(36, TOTAL_GRID_SIZE + 36),
    area(),
    text('end turn', { font: 'sink', size: 24 }),
  ]);

  add([
    'health-ui',
    pos(width() - 36, TOTAL_GRID_SIZE + 36),
    origin('topright'),
    text('', { font: 'sink', size: 24 }),
    {
      update() {
        const hp = getPlayer().hp();
        if (hp <= 0) this.text = 'game over';
        else this.text = `hp: ${hp}`;
      },
    },
  ]);

  add([
    'xp-ui',
    pos(width() - 192, TOTAL_GRID_SIZE + 36),
    origin('topright'),
    text('', { font: 'sink', size: 24 }),
    {
      update() {
        const xp = getPlayer().xp;
        const levelCap = getPlayer().LEVEL_CAP;
        this.text = `xp: ${xp}/${levelCap}`;
      },
    },
  ]);
}
