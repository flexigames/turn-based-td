import { TOTAL_GRID_SIZE } from '../main';

export default function createMenu() {
  const endTurnButton = add([
    'end-turn-button',
    area(),
    pos(36, TOTAL_GRID_SIZE + 36),
    text('end turn', { font: 'sink', size: 24 }),
  ]);

  const healthUi = add([
    'health-ui',

  ])

  return [endTurnButton];
}
