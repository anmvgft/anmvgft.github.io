import { LitElement, html, css } from 'lit';
import { FirerMixin } from '../helpers/FirerMixin.js';

export class Option extends FirerMixin(LitElement) {
  static get properties() {
    return {
      name: { type: String },
      looseAgainst: { type: Array },
      AIThinking: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 50%;
        height: 100px;
        background-color: #004481;
      }
      .option__btn {
        cursor: pointer;
        background-color: #1973b8;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
      .option__btn:hover,
      .option__btn:active {
        background-color: white;
      }

      .option__btn--rock {
        mask: url(assets/rock.svg) no-repeat center / contain;
        -webkit-mask: url(assets/rock.svg) no-repeat center / contain;
      }
      .option__btn--paper {
        mask: url(assets/paper.svg) no-repeat center / contain;
        -webkit-mask: url(assets/paper.svg) no-repeat center / contain;
      }
      .option__btn--scissors {
        mask: url(assets/scissors.svg) no-repeat center / contain;
        -webkit-mask: url(assets/scissors.svg) no-repeat center / contain;
      }
      .option__btn--lizard {
        mask: url(assets/lizard.svg) no-repeat center / contain;
        -webkit-mask: url(assets/lizard.svg) no-repeat center / contain;
      }
      .option__btn--spock {
        mask: url(assets/spock.svg) no-repeat center / contain;
        -webkit-mask: url(assets/spock.svg) no-repeat center / contain;
      }
    `;
  }

  selectOption() {
    if (!this.AIThinking) {
      this.fire('option-selected-event', this);
    }
  }

  loosesAgainst(against) {
    return this.looseAgainst.includes(against);
  }

  render() {
    return html`
      <section class="option">
        <article
          onclick=""
          @click="${this.selectOption}"
          @keydown="${this.selectOption}"
          class="option__btn option__btn--${this.name}"
        ></article>
      </section>
    `;
  }
}
