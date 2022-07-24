import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'

export class AppImage extends LitElement {
    static get properties() {
        return {
            src: {type: String},
            loading: {type: String},
            decoding: {type: String}
        }
    }

    static get styles() {
        return css`
          :host {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
            position: relative;
            background-size: 100px;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: var(--border-radius);
            /*background-color: rgba(128, 128, 128, 0.1);*/
            background-image: url("/assets/images/logo.svg");
          }

          img {
            margin: -1px;
            position: absolute;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            display: block;
            object-fit: cover;
            object-position: center;
            border-radius: var(--border-radius);
          }
        `
    }

    render() {
        return html`
            <picture><img src="${ifDefined(this.src)}"
                          loading="${ifDefined(this.loading)}" decoding="${ifDefined(this.decoding)}"></picture>`
    }
}

customElements.define('app-image', AppImage)
