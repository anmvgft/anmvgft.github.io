import { LitElement, html, css } from 'lit';
import Player from '../classes/Player.js';
import { FirerMixin } from '../helpers/FirerMixin.js';
import Storage from '../helpers/Storage.js';
import GameEngine from '../classes/GameEngine.js';
import { CONSTANTS } from '../helpers/CONSTANTS.js';

export class Game extends FirerMixin(LitElement) {
  static get properties() {
    return {
      user: { type: String },
      gameType: { type: String },
      AIThinking: { type: Boolean },
    };
  }

  static get styles() {
    return [
      css`
        .game {
          margin-top: 10vh;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .game__optionsList {
          margin-bottom: 40px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }
        .game__playerInfo {
          margin-bottom: 20px;
        }
        .game__resultBox {
          font-size: 1.7em;
          color: #f8cd51;
          margin-bottom: 30px;
        }
        #game__result {
          text-align: center;
        }
      `,
    ];
  }

  unsetUser() {
    Storage.remove(CONSTANTS.ISPLAYING);
    this.fire('set-user-event', null);
  }

  connectedCallback() {
    super.connectedCallback();
    this.player = new Player(this.user, this.gameType);
    Storage.save(CONSTANTS.ISPLAYING, {
      user: this.user,
      gameType: this.gameType,
    });
    this.game = new GameEngine(this.player);
  }

  resetFields() {
    [this.result, this.playerChoiceStr, this.AIchoiceStr] = Array(3).fill('');
  }

  play(ev) {
    this.resetFields();
    this.AIThinking = true;
    const playerChoice = ev.detail;
    this.playerChoiceStr = `You: ${playerChoice}`;
    setTimeout(() => {
      const gameResult = this.game.chooseWinner(playerChoice);
      [this.AIchoiceStr, this.result] = gameResult;
      this.AIThinking = false;
    }, CONSTANTS.AI_RESPONSE_TIMEOUT);
  }

  renderResult() {
    return html`
      <article>${this.playerChoiceStr} ${this.AIchoiceStr}</article>
      <article id="game__result">${this.result}</article>
    `;
  }

  renderGameOptions() {
    return html`
      ${this.game.gameOptions.map(
        gameOpt => html`
          <game-option
            @option-selected-event="${this.play}"
            name="${gameOpt.name}"
            ?AIThinking="${this.AIThinking}"
          ></game-option>
        `
      )}
    `;
  }

  renderUserScore() {
    return html`<h1>
      Player : ${this.player.name} | Score : ${this.player.score}
    </h1>`;
  }

  render() {
    return html`
      <main class="game">
        <section class="game__playerInfo">${this.renderUserScore()}</section>
        <section class="game__optionsList">${this.renderGameOptions()}</section>
        <section class="game__resultBox">${this.renderResult()}</section>
        <button-component
          classes="game__exitBtn"
          id="game__exitBtn"
          @click="${this.unsetUser}"
          txt="Exit"
        >
        </button-component>
      </main>
    `;
  }
}
