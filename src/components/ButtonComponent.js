import { LitElement, html, css } from 'lit';

export class ButtonComponent extends LitElement {
  static get properties() {
    return {
      classes: { type: String },
      txt: { type: String },
    };
  }

  static get styles() {
    return css`
      .button {
        background: #fbca1f;
        font-family: inherit;
        padding: 0.6em 1.3em;
        font-weight: 900;
        font-size: 18px;
        border: 3px solid black;
        border-radius: 0.4em;
        box-shadow: 0.1em 0.1em;
      }

      .button:hover,
      .button:active {
        cursor: pointer;
        transform: translate(-0.05em, -0.05em);
        box-shadow: 0.15em 0.15em;
      }

      .button:disabled,
      .button[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #b9b7b7;
      }
      .button:disabled:hover,
      .button:disabled:active,
      .button[disabled]:hover,
      .button[disabled]:active {
        cursor: default;
        background-color: #cccccc;
      }
    `;
  }

  render() {
    return html` <button class="button ${this.classes}">${this.txt}</button> `;
  }
}
