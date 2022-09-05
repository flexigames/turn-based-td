import { CELL_COUNT, CELL_SIZE } from './cell';

export function addGrid() {
  const gridColor = rgb(100, 100, 100);
  for (let i = 0; i <= CELL_COUNT; i++) {
    add([
      color(gridColor),
      pos(vec2(0, i * CELL_SIZE)),
      rect(CELL_COUNT * CELL_SIZE, 2),
    ]);

    add([
      color(gridColor),
      pos(vec2(i * CELL_SIZE, 0)),
      rect(2, CELL_COUNT * CELL_SIZE),
    ]);
  }
}
