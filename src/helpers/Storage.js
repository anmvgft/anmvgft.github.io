import { CONSTANTS } from './CONSTANTS.js';

export default class Storage {
  static load(name) {
    return JSON.parse(
      window.localStorage.getItem(`${CONSTANTS.SAVEPREFIX} ${name}`)
    );
  }

  static save(name, data) {
    window.localStorage.setItem(
      `${CONSTANTS.SAVEPREFIX} ${name}`,
      JSON.stringify(data)
    );
  }

  static remove(name) {
    window.localStorage.removeItem(`${CONSTANTS.SAVEPREFIX} ${name}`);
  }
}
