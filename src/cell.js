import { sample } from 'lodash';

export const CELL_SIZE = 48;
export const CELL_COUNT = 15;

export function cellPos(x, y) {
  return {
    ...pos(x * CELL_SIZE, y * CELL_SIZE),
    cell: vec2(x, y),
  };
}

export function cellSprite(name, options = {}) {
  return sprite(name, { width: CELL_SIZE, height: CELL_SIZE, ...options });
}

export function isCellOccupied(cellObjects, x, y) {
  return cellObjects.some(
    (object) => object.cell.x === x && object.cell.y === y
  );
}

export function cellPosToPixel(cellPos) {
  return vec2(cellPos.x * CELL_SIZE, cellPos.y * CELL_SIZE);
}

export function isInRange(pos1, pos2, range) {
  return pos1.dist(pos2) <= range;
}

export function pixelToCellPos(pos) {
  const GRID_SIZE = CELL_SIZE * CELL_COUNT;
  if (pos.x > GRID_SIZE || pos.y > GRID_SIZE) return;

  return vec2(Math.floor(pos.x / CELL_SIZE), Math.floor(pos.y / CELL_SIZE));
}

export function getRandomBorderCell() {
  const direction = sample(['TOP', 'LEFT', 'RIGHT', 'BOTTOM']);

  if (direction === 'TOP') return vec2(randi(CELL_COUNT), 0);
  if (direction === 'LEFT') return vec2(0, randi(randi(CELL_COUNT)));
  if (direction === 'RIGHT')
    return vec2(CELL_COUNT - 1, randi(randi(CELL_COUNT)));
  if (direction === 'BOTTOM') return vec2(randi(CELL_COUNT), CELL_COUNT - 1 );
}
