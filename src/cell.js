export const CELL_SIZE = 48;
export const CELL_COUNT = 15;

export function cellPos(x, y) {
  return { ...pos(x * CELL_SIZE, y * CELL_SIZE), cell: vec2(x, y) };
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
