import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
// import Storage from '../src/helpers/Storage.js';
// import { Option } from '../src/components/Option.js';
import '../src/rock-paper-scissors.js';
import { CONSTANTS } from '../src/helpers/CONSTANTS.js';

describe('Option', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-option
      name="${CONSTANTS.PAPER}"
      .looseAgainst="${[CONSTANTS.SCISSORS]}"
      ?AIThinking="${false}"
    ></game-option>`);
  });

  it('triggers event option-selected-event', done => {
    window.addEventListener('option-selected-event', event => {
      expect(event.detail).to.be.equal(CONSTANTS.PAPER);
      done();
    });
    element.shadowRoot.querySelector('article.option__btn').click();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
