import { mapValues } from 'lodash';

export default function loadSprites() {
  const sprites = {
    base: {
      x: 3,
      y: 19,
    },
    enemy: {
      x: 27,
      y: 0,
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
