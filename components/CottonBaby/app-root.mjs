import {css, html, LitElement} from "lit"
import './app-header.mjs'

export class AppRoot extends LitElement {
    static get styles() {
        return css`
          :host {
            height: 100%;
            display: block;
          }

          app-header {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
          }
        `
    }

    render() {
        return html`
            <app-header></app-header>`
    }
}

customElements.define('app-root', AppRoot)
