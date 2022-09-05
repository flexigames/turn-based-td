import { sampleSize } from 'lodash';
import { changeState } from '../main';
import { getPlayer } from './helpers';

const choices = [
  {
    text: '+1hp',
    effect: () => {
      getPlayer().heal(1);
    },
  },
  {
    text: 'tower',
    effect: () => {
      changeState('building-tower');
    },
  },
];

let removeOnClickHandler;

export function createChoices() {
  add([
    'choice-ui',
    'choice-background',
    pos(width() / 2, height() / 2),
    z(100),
    rect((2 * width()) / 3, height() / 3),
    origin('center'),
    color(BLACK),
    outline(16, WHITE),
  ]);

  const options = sampleSize(choices, 2);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    add([
      'choice-ui',
      'choice',
      pos(width() / 2 - 112 + 224 * i, height() / 2),
      origin('center'),
      z(101),
      area(),
      text(option.text, { font: 'sink', size: 24 }),
      {
        choose() {
          option.effect();
          removeChoices();
        },
      },
    ]);
  }

  removeOnClickHandler = onClick('choice', (choice) => choice.choose());
}

function removeChoices() {
  destroyAll('choice-ui');
  removeOnClickHandler?.();
  removeOnClickHandler = undefined;
}
