import { TOTAL_GRID_SIZE } from '../main';
import { getPlayer } from './helpers';

export default function createMenu() {
  const endTurnButton = add([
    'end-turn-button',
    area(),
    pos(36, TOTAL_GRID_SIZE + 36),
    text('end turn', { font: 'sink', size: 24 }),
  ]);

  const healthUi = add([
    'health-ui',
    area(),
    origin('topright'),
    pos(width() - 36, TOTAL_GRID_SIZE + 36),
    text('', { font: 'sink', size: 24 }),
    {
      update() {
        const hp = getPlayer().hp();
        if (hp <= 0) this.text = 'game over';
        else this.text = `hp: ${hp}`;
      },
    },
  ]);

  return [endTurnButton];
}
