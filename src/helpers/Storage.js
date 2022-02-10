import { CONSTANTS } from './CONSTANTS.js';
export default class Storage {
  static load(name) {
    return JSON.parse(
      window.localStorage.getItem(`${CONSTANTS.SAVE_PREFIX}${name}`)
    );
  }

  static save(name, data) {
    window.localStorage.setItem(
      `${CONSTANTS.SAVE_PREFIX}${name}`,
      JSON.stringify(data)
    );
  }

  static remove(name) {
    window.localStorage.removeItem(`${CONSTANTS.SAVE_PREFIX}${name}`);
  }
}
