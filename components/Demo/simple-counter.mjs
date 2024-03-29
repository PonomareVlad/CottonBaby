import {html, css, LitElement} from "lit"
import {state} from '#lib/router.mjs'
import {scheduleTask} from "#utils";

class SimpleCounter extends LitElement {
    static get properties() {
        return {count: {state: true}}
    }

    static get styles() {
        return css`
          button {
            font-size: inherit;
            touch-action: manipulation;
          }`
    }

    setCount(value) {
        state.count = this.count = value
    }

    firstUpdated() {
        scheduleTask(() => this.count = state.count || 0);
    }

    render() {
        return html`
            <button @click="${() => this.setCount(--this.count)}">-</button>
            <output>${this.count || 0}</output>
            <button @click="${() => this.setCount(++this.count)}">+</button>`
    }
}

customElements.define('simple-counter', SimpleCounter)
