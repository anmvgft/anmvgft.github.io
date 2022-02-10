import { LitElement, html } from 'lit';

export class RockPaperScissors extends LitElement {
  static get properties() {
    return {
      currentUser: {
        type: Object,
      },
    };
  }

  setUser(ev) {
    this.currentUser = ev.detail;
  }

  render() {
    return html`
      ${!this.currentUser
        ? html`<home-view @set-user-event="${this.setUser}"></home-view>`
        : html`<game-view
            gameType="${this.currentUser.gameType}"
            @set-user-event="${this.setUser}"
            user="${this.currentUser.name}"
          ></game-view>`}
    `;
  }
}
