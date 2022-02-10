export default class AI {
  static play(lastMove, options) {
    const responses = options
      .map(o => o.name)
      .filter(item => item !== lastMove);
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
