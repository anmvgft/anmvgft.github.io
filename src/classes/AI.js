import { CONSTANTS } from '../helpers/CONSTANTS.js';

export default class AI {
  static play(lastMove, options) {
    return new Promise(resolve => {
      setTimeout(() => {
        const responses = options
          .map(o => o.name)
          .filter(item => item !== lastMove);
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, CONSTANTS.AI_RESPONSE_TIMEOUT);
    });
  }
}
