import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import Storage from '../src/helpers/Storage.js';
import { CONSTANTS } from '../src/helpers/CONSTANTS.js';

import '../src/rock-paper-scissors.js';

describe('RockPaperScissors', () => {
  let element;
  beforeEach(async () => {
    Storage.remove(CONSTANTS.ISPLAYING);
    element = await fixture(
      html`<rock-paper-scissors-app></rock-paper-scissors-app>`
    );
  });

  it('renders input', () => {
    expect(element.currentUser).to.be.equal(undefined);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('RockPaperScissors', () => {
  let element;
  beforeEach(async () => {
    Storage.save(CONSTANTS.ISPLAYING, { user: 'nadie', gameType: 'classic' });
    element = await fixture(
      html`<rock-paper-scissors-app></rock-paper-scissors-app>`
    );
  });

  it('renders game screen on saved ', () => {
    expect(element.currentUser.name).to.be.equal('nadie');
  });
});
