import { sampleSize } from 'lodash';
import { changeState } from '../main';
import { getPlayer } from './helpers';

const choices = [
  {
    text: '+5hp',
    effect: () => {
      getPlayer().heal(5);
    },
  },
  {
    text: 'tower',
    effect: () => {
      changeState('building-tower');
    },
  },
  {
    text: 'barracks',
    effect: () => {
      changeState('building-barracks');
    },
  },
  {
    text: '+1dmg (king)',
    effect: () => {
      getPlayer().damage += 1;
    },
  },
  {
    text: 'fireball',
    effect: () => {
      changeState('spell-fireball');
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

  const options = sampleSize(choices, 3);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    add([
      'choice-ui',
      'choice',
      pos(width() / 2, height() / 2 - 48 + 48 * i),
      origin('center'),
      z(101),
      area(),
      color(WHITE),
      text(option.text, { font: 'sink', size: 16 }),
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
