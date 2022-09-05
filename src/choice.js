import { getPlayer } from './helpers';

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

  add([
    'choice-ui',
    'choice',
    pos(width() / 2 - 112, height() / 2),
    origin('center'),
    z(101),
    area(),
    text('+2hp', { font: 'sink', size: 24 }),
    {
      choose() {
        getPlayer().heal(2);
        removeChoice();
      },
    },
  ]);

  add([
    'choice-ui',
    'choice',
    pos(width() / 2 + 112, height() / 2),
    origin('center'),
    z(101),
    area(),
    text('+1hp', { font: 'sink', size: 24 }),
    {
      choose() {
        getPlayer().heal(1);
        removeChoice();
      },
    },
  ]);

  onClick('choice', (choice) => choice.choose());
}

function removeChoice() {
  destroyAll('choice-ui');
}
