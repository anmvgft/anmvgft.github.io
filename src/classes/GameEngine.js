import AI from './AI.js';
import { GAMEOPTIONS, GAMETYPES } from '../helpers/CONSTANTS.js';

export default class GameEngine {
  constructor(player) {
    this.player = player;
    this.lastAIMove = '';
    this.gameOptions = GAMEOPTIONS.filter(go =>
      GAMETYPES[player.gameType].includes(go.name)
    );
  }

  chooseWinner(playerChoice) {
    const AIChoice = AI.play(this.lastAIMove, this.gameOptions);
    this.lastAIMove = AIChoice;

    if (playerChoice === AIChoice) {
      return [` | Bot : ${AIChoice}`, "It's a tie!"];
    }
    const userWon = this.gameOptions
      .filter(e => e.name === AIChoice)
      .map(e => e.looseAgainst)[0]
      .includes(playerChoice);

    const result = userWon ? 'You won' : 'AI won';

    if (userWon) {
      this.player.addPoint();
    }

    return [` | Bot : ${AIChoice}`, `Result : ${result}`];
  }
}
