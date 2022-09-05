export const CELL_SIZE = 48;
export const CELL_COUNT = 15;

export function cellPos(x, y) {
  return pos(x * CELL_SIZE, y * CELL_SIZE);
}

export function cellSprite(name, options = {}) {
  return sprite(name, { width: CELL_SIZE, height: CELL_SIZE, ...options });
}

