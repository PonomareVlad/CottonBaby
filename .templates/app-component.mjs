import {css, html, LitElement} from "lit"
import styles from "#styles"

export class AppComponent extends LitElement {
    static get styles() {
        return [styles, css`
          :host {
            display: block;
          }
        `]
    }

    render() {
        return html`Component template`
    }
}

customElements.define('app-component', AppComponent)
