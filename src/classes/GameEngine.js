import AI from './AI.js';

export default class GameEngine {
  constructor(player, gameOptions) {
    this.player = player;
    this.gameOptions = gameOptions;
    this.lastAIMove = '';
  }

  chooseWinner(playerChoice) {
    const AIChoice = AI.play(this.lastAIMove, this.gameOptions);
    this.lastAIMove = AIChoice;

    if (playerChoice === AIChoice) {
      return [AIChoice, "It's a tie!"];
    }
    const userWon = this.gameOptions
      .filter(e => e.name === AIChoice)
      .map(e => e.looseAgainst)[0]
      .includes(playerChoice);

    const result = userWon ? 'You won' : 'AI won';

    if (userWon) {
      this.player.addPoint();
    }
    return [AIChoice, result];
  }
}
