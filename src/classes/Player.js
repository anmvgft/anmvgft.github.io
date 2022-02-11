import Storage from '../helpers/Storage.js';

export default class Player {
  constructor(name, gameType) {
    this.gameType = gameType;
    this.name = name;
    this.score = this.searchUserScore(this.name);
  }

  searchUserScore() {
    return Storage.load(this.name)?.score || 0;
  }

  saveUserScore() {
    const userScore = {
      name: this.name,
      score: this.score,
    };

    Storage.save(this.name, userScore);
  }

  addPoint() {
    this.score += 1;
    this.saveUserScore();
  }
}
