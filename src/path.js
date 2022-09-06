import { sample, times } from 'lodash';
import { cellPos, CELL_COUNT, CELL_SIZE, getRandomBorderCell } from './cell';

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

export function generatePathPoints() {
  const pathPoints = [getRandomBorderCell()];
  let direction = Math.random() > 0.5 ? 'x' : 'y';
  for (let index = 0; index < 5; index++) {
    console.log(pathPoints);
    if (direction === 'x') {
      pathPoints.push(
        vec2(
          sample(
            times(CELL_COUNT).filter(
              (i) => ![6, 7, 8, pathPoints[index].x].includes(i)
            )
          ),
          pathPoints[index].y
        )
      );
      direction = 'y';
    } else {
      pathPoints.push(
        vec2(
          pathPoints[index].x,
          sample(
            times(CELL_COUNT).filter(
              (i) => ![6, 7, 8, pathPoints[index].y].includes(i)
            )
          )
        )
      );
      direction = 'x';
    }
  }
  return pathPoints;
}
