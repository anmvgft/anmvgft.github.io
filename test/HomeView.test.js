import { html } from 'lit';
import sinon from 'sinon';
import { fixture, expect } from '@open-wc/testing';
// import { FirerMixin } from '../src/helpers/FirerMixin.js';
import Storage from '../src/helpers/Storage.js';
import '../src/rock-paper-scissors.js';
import '../src/views/HomeView.js';
import { CONSTANTS } from '../src/helpers/CONSTANTS.js';

describe('HomeViewTest', () => {
  let element;

  beforeEach(async () => {
    Storage.remove(CONSTANTS.ISPLAYING);
    element = await fixture(html`<home-view></home-view>`);
  });

  it('invalid user name', async () => {
    expect(element.userName).to.be.equal('');
  });

  it('disables button on empty user name', () => {
    const input = element.shadowRoot.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    const btnDisabled = element.shadowRoot
      .querySelector('button-component')
      .shadowRoot.querySelector('button')
      .getAttribute('disabled');
    expect(btnDisabled).to.be.equal('');
  });

  it('disables button on invalid user name', () => {
    const input = element.shadowRoot.querySelector('input');
    input.value = '*^¿?·';
    input.dispatchEvent(new Event('input'));
    const btnDisabled = element.shadowRoot
      .querySelector('button-component')
      .shadowRoot.querySelector('button')
      .getAttribute('disabled');
    expect(btnDisabled).to.be.equal('');
  });

  it('enables button on valid user name', done => {
    const input = element.shadowRoot.querySelector('input');
    input.value = 'validusername';
    input.dispatchEvent(new Event('input'));
    setTimeout(() => {
      const btnDisabled = element.shadowRoot
        .querySelector('button-component')
        .shadowRoot.querySelector('button')
        .getAttribute('disabled');
      console.log(btnDisabled);
      expect(btnDisabled).to.be.equal(null);
      done();
    }, 1);
  });

  it('input user fires set-user-event with new user and 0 points', done => {
    const value = 'validusername';
    const _dispatchEventSpy = sinon.spy(element, 'dispatchEvent');
    const input = element.shadowRoot.querySelector('input');
    input.value = value;
    input.dispatchEvent(new Event('input'));
    setTimeout(() => {
      const btn = element.shadowRoot.querySelector('#home__enterBtn');
      btn.dispatchEvent(new Event('click'));

      setTimeout(() => {
        const dispatch = _dispatchEventSpy.args[0][0];
        expect(dispatch.type).to.be.equal('set-user-event');
        expect(dispatch.detail.name).to.be.equal(value);
        expect(dispatch.detail.points).to.be.equal(0);
        _dispatchEventSpy.restore();
        done();
      }, 1);
    }, 1);
  });

  it('chooses game type', done => {
    const select = element.shadowRoot.querySelector('select');
    select.value = CONSTANTS.SPOCK;
    select.dispatchEvent(new Event('change'));
    setTimeout(() => {
      expect(element.gameType).to.be.equal(CONSTANTS.SPOCK);
      done();
    }, 1);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
