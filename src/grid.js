import { CELL_COUNT, CELL_SIZE } from './cell';

export function drawGrid() {
  for (let i = 0; i <= CELL_COUNT; i++) {
    drawLine({
      p1: vec2(i * CELL_SIZE, 0),
      p2: vec2(i * CELL_SIZE, CELL_COUNT * CELL_SIZE),
      width: 2,
      color: rgb(200, 200, 200),
    });

    drawLine({
      p1: vec2(0, i * CELL_SIZE),
      p2: vec2(CELL_COUNT * CELL_SIZE, i * CELL_SIZE),
      width: 2,
      color: rgb(200, 200, 200),
    });
  }
}
