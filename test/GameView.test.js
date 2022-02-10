import { html } from 'lit';
import sinon from 'sinon';
import { fixture, expect } from '@open-wc/testing';

// import { FirerMixin } from '../src/helpers/FirerMixin.js';
import Storage from '../src/helpers/Storage.js';
import '../src/rock-paper-scissors.js';
import '../src/views/GameView.js';
import AI from '../src/classes/AI.js';

import { CONSTANTS } from '../src/helpers/CONSTANTS.js';

describe('GameView', () => {
  let element;
  const stu = sinon.stub(AI, 'play');
  beforeEach(async () => {
    Storage.save(CONSTANTS.ISPLAYING, { user: 'nadie' });
    element = await fixture(
      html`<game-view user="nadie" gameType="classic"></game-view>`
    );

    stu.onCall(0).returns(
      new Promise(resolve => {
        resolve('rock');
      })
    );
    stu.onCall(1).returns(
      new Promise(resolve => {
        resolve('rock');
      })
    );
    stu.onCall(2).returns(
      new Promise(resolve => {
        resolve('rock');
      })
    );
  });

  it('click exit btn triggers unsets the user', done => {
    const _dispatchEventSpy = sinon.spy(element, 'dispatchEvent');
    const btn = element.shadowRoot.querySelector('#game__exitBtn');
    setTimeout(() => {
      setTimeout(() => {
        const dispatch = _dispatchEventSpy.args[0][0];
        expect(dispatch.type).to.be.equal('set-user-event');
        expect(dispatch.detail).to.be.equal(null);
        _dispatchEventSpy.restore();
        done();
      }, 1);
    }, 1);
    btn.dispatchEvent(new Event('click'));
  });

  it('responds with AI on user move in tie', done => {
    const rock = element.shadowRoot.querySelector('game-option[name=rock]');
    const rockMock = {
      name: 'rock',
      loosesAgainst() {
        return false;
      },
    };
    rock.dispatchEvent(
      new CustomEvent('option-selected-event', {
        detail: rockMock,
        bubbles: true,
        composed: true,
      })
    );
    setTimeout(() => {
      expect(
        element.shadowRoot.querySelector('#game__result').textContent
      ).to.be.equal("Result : It's a tie!");
      done();
    }, 1200);
  });

  it('responds with AI on user move in AI won', done => {
    const rock = element.shadowRoot.querySelector('game-option[name=rock]');
    const rockMock = {
      name: 'scissors',
      loosesAgainst() {
        return true;
      },
    };
    rock.dispatchEvent(
      new CustomEvent('option-selected-event', {
        detail: rockMock,
        bubbles: true,
        composed: true,
      })
    );
    setTimeout(() => {
      expect(
        element.shadowRoot.querySelector('#game__result').textContent
      ).to.be.equal('Result : AI won');
      done();
    }, 1200);
  });

  it('responds with AI on user move in user won', done => {
    const rock = element.shadowRoot.querySelector('game-option[name=rock]');
    const rockMock = {
      name: 'paper',
      loosesAgainst() {
        return false;
      },
    };
    rock.dispatchEvent(
      new CustomEvent('option-selected-event', {
        detail: rockMock,
        bubbles: true,
        composed: true,
      })
    );
    setTimeout(() => {
      expect(
        element.shadowRoot.querySelector('#game__result').textContent
      ).to.be.equal('Result : You won');
      done();
    }, 1200);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
