import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `kwc-circle-progress`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class KwcCircleProgress extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'kwc-circle-progress',
      },
    };
  }
}

window.customElements.define('kwc-circle-progress', KwcCircleProgress);
