import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Manifest } from '../utils/interfaces';
import { prettyString } from '../utils/pretty-json';

import "./toast";

@customElement('manifest-code-form')
export class ManifestCodeForm extends LitElement {

  @property({type: Object}) manifest: Manifest = {};
  @state() showCopyToast: any | null = false;


  static get styles() {
    return [
      css`
        #code-holder {
          position: relative;
          max-width: 700px;
        }
        #code-editor {
          overflow-x: scroll;
          margin: 0;
          background-color: #f6f8fa;
          padding: 5px;
          padding-top: 0;
          font-size: 16px;
        }
        #copy-manifest {
          position: absolute;
          top: 5px;
          right: 5px;
          display: flex;
          align-items: center;
        }
        #copy-manifest:hover {
          cursor: pointer;
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  firstUpdated() {
  }

  copyToClip(){
     /* Copy the text inside the text field */
     navigator.clipboard.writeText(prettyString(this.manifest));
     this.showCopyToast = true;
     setTimeout(() => {
         this.showCopyToast = false;
     }, 3000)

  }

  render() {
    return html`
      <div id="code-holder">
        <pre id="code-editor"><code>${prettyString(this.manifest)}</code></pre>
        <button id="copy-manifest" @click=${() => this.copyToClip()}><ion-icon name="copy"></ion-icon>Copy Manifest</button>
      </div>
      ${this.showCopyToast ? html`<app-toast>Manifest Copied to Clipboard</app-toast>` : html``}
    `;
  }
}