import Storage from '../helpers/Storage.js';

export default class Player {
  constructor(name) {
    this.name = name;
    this.score = this.searchUserScore(this.name);
  }

  searchUserScore() {
    let userData = Storage.load(this.name);
    if (!userData) {
      userData = {
        name: this.name,
        score: 0,
      };
    }
    return userData.score;
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
