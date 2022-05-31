import {css, html, LitElement} from "lit"

export class AppComponent extends LitElement {
    static get styles() {
        return css`
          :host {
            display: block;
          }
        `
    }

    render() {
        return html`Component template`
    }
}

customElements.define('app-component', AppComponent)
