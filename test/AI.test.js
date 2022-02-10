import { expect } from '@open-wc/testing';
import AI from '../src/classes/AI.js';
import { CONSTANTS } from '../src/helpers/CONSTANTS.js';

describe('AI', () => {
  it('AI doesnt repeat moves', () => {
    const gameOptions = [
      {
        name: CONSTANTS.ROCK,
        looseAgainst: [CONSTANTS.PAPER, CONSTANTS.SPOCK],
      },
      {
        name: CONSTANTS.PAPER,
        looseAgainst: [CONSTANTS.SCISSORS, CONSTANTS.LIZARD],
      },
      {
        name: CONSTANTS.SCISSORS,
        looseAgainst: [CONSTANTS.ROCK, CONSTANTS.SPOCK],
      },
      {
        name: CONSTANTS.LIZARD,
        looseAgainst: [CONSTANTS.ROCK, CONSTANTS.SCISSORS],
      },
      {
        name: CONSTANTS.SPOCK,
        looseAgainst: [CONSTANTS.PAPER, CONSTANTS.LIZARD],
      },
    ];
    const choice1 = AI.play('rock', gameOptions);
    expect(choice1).to.be.not.equal('rock');
  });
});
