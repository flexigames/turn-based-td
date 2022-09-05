import { mapValues } from 'lodash';

export default function loadSprites() {
  const sprites = {
    base: {
      x: 6,
      y: 19,
    },
    enemy: {
      x: 27,
      y: 0,
    },
    tower: {
      x: 2,
      y: 19,
    },
  };

  loadSpriteAtlas(
    'spritesheet.png',
    mapValues(sprites, ({ x, y }) => ({
      x: x * 17,
      y: y * 17,
      width: 16,
      height: 16,
    }))
  );
}
