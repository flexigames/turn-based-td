import { cellPos, CELL_SIZE } from './cell';

export default function createPath(path) {
  for (let i = 0; i < path.length - 1; i++) {
    createPathSection(path[i], path[i + 1]);
  }
}

function createPathSection(start, end) {
  const distanceX = end.x - start.x;
  const distanceY = end.y - start.y;

  if (distanceX > 0) {
    for (let x = start.x; x < end.x; x++) {
      addPathObject(x, start.y);
    }
  } else if (distanceX < 0) {
    for (let x = start.x; x > end.x; x--) {
      addPathObject(x, start.y);
    }
  } else if (distanceY > 0) {
    for (let y = start.y; y < end.y; y++) {
      addPathObject(start.x, y);
    }
  } else if (distanceY < 0) {
    for (let y = start.y; y > end.y; y--) {
      addPathObject(start.x, y);
    }
  }
}

function addPathObject(x, y) {
  add([
    'path-object',
    cellPos(x, y),
    rect(CELL_SIZE, CELL_SIZE),
    z(-100),
    color(rgb(50, 50, 50)),
  ]);
}
