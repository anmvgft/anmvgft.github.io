import { LitElement, html, css } from 'lit';
import { FirerMixin } from '../helpers/FirerMixin.js';
import Storage from '../helpers/Storage.js';
import { CONSTANTS } from '../helpers/CONSTANTS.js';

export class Home extends FirerMixin(LitElement) {
  static get properties() {
    return {
      userName: { type: String },
      gameType: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        .home {
          margin-top: 10vh;
          height: 100vh;

          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #home__userNameInput {
          width: 33vw;
          padding: 5px;
          font-size: 16px;
          border-width: 1px;
          margin-bottom: 20px;
          border-color: #cccccc;
          background-color: #ffffff;
          color: #000000;
          border-style: solid;
          border-radius: 0px;
          box-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
          text-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
        }
        #home__userNameInput:focus {
          outline: none;
        }
        .home__gameTypeSelect {
          margin-bottom: 30px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.userName = '';
    this.gameType = CONSTANTS.GAMETYPES.CLASSIC;
  }

  connectedCallback() {
    super.connectedCallback();
    const wasPlaying = Storage.load(CONSTANTS.ISPLAYING);
    if (wasPlaying) {
      this.userName = wasPlaying.user;
      this.gameType = wasPlaying.gameType;
      this.setUser();
    }
  }

  setUser() {
    this.fire('set-user-event', {
      name: this.userName,
      gameType: this.gameType,
      points: 0,
    });
  }

  selectGameType(ev) {
    this.gameType = ev.target.value;
  }

  inputUser(ev) {
    this.userName = ev.target.value;

    if (!this.userName || !this.userName.match(/^[a-z0-9]*$/i)) {
      this.userName = '';
    }
  }

  render() {
    return html` <main class="home">
      <h2>Ready player 1</h2>
      <input
        id="home__userNameInput"
        type="text"
        @input="${this.inputUser}"
        aria-label="User"
      />

      <select
        class="home__gameTypeSelect"
        aria-label="Game type"
        @change="${this.selectGameType}"
      >
        ${Object.keys(CONSTANTS.GAMETYPES).map(
          gt => html`
            <option value="${CONSTANTS.GAMETYPES[gt]}">
              ${CONSTANTS.GAMETYPES[gt]}
            </option>
          `
        )}
      </select>
      <button-component
        id="home__enterBtn"
        txt="Enter"
        @click="${this.setUser}"
        .disbl="${this.userName === ''}"
      ></button-component>
    </main>`;
  }
}
