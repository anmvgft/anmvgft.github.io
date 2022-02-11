export const CONSTANTS = {
  SAVE_PREFIX: 'RPS-',
  ISPLAYING: 'isPlaying',
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
  LIZARD: 'lizard',
  SPOCK: 'spock',
  GAMETYPES: {
    CLASSIC: 'classic',
    SPOCK: 'spock',
  },
  AI_RESPONSE_TIMEOUT: 1000,
  RESULT_SHOW_TIMEOUT: 500,
};

export const GAMEOPTIONS = [
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

export const GAMETYPES = {
  classic: [CONSTANTS.ROCK, CONSTANTS.PAPER, CONSTANTS.SCISSORS],
  spock: [
    CONSTANTS.ROCK,
    CONSTANTS.PAPER,
    CONSTANTS.SCISSORS,
    CONSTANTS.LIZARD,
    CONSTANTS.SPOCK,
  ],
};
