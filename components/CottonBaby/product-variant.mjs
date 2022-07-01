import {css, html, LitElement} from "lit"
import {live} from 'lit/directives/live.js'
import {ref, createRef} from "lit/directives/ref.js"
import styles from "#styles"

export class ProductVariant extends LitElement {
    input = createRef()

    constructor() {
        super();
        this.value = '0'
    }

    static get properties() {
        return {title: {type: String}, value: {type: String, reflect: true}}
    }

    static get styles() {
        return [styles, css`
          :host {
            --background-color: white;
            font-size: 18px;
            line-height: 38px;
            font-weight: bold;
            user-select: none;
            position: relative;
            padding-left: 15px;
            border-radius: 20px;
            white-space: nowrap;
            background-color: var(--background-color);
            border: solid 1px rgba(151, 151, 151, 0.54);
          }

          .title {
            width: 100%;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .count {
            top: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            border-radius: 40px;
            display: inline-flex;
            background: linear-gradient(to right, transparent, var(--background-color) 10px);
          }

          input[type="number"] {
            -moz-appearance: textfield;
            -webkit-appearance: none;
            user-select: initial;
            font-weight: inherit;
            flex-basis: content;
            background: none;
            display: inline;
            max-width: 2ch;
            min-width: 2ch;
            border: none;
            width: 100%;
            padding: 0;
            margin: 0;
            opacity: 1;
            color: black;
            text-align: center;
            font-size: inherit;
            line-height: inherit;
          }

          button {
            -webkit-appearance: none;
            display: inline-block;
            border-radius: 40px;
            line-height: 38px;
            font-weight: 100;
            background: none;
            min-width: 38px;
            font-size: 25px;
            cursor: pointer;
            color: inherit;
            border: none;
            width: 38px;
            padding: 0;
            margin: 0;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          :host([value="0"]:not(:focus-within)) {
            --background-color: rgb(233 233 235);
            padding-right: 15px;
            border: solid 1px var(--background-color);
            background-color: var(--background-color);
          }

          :host([value="0"]:not(:focus-within)) .count > * {
            display: none;
          }

          :host([value="0"]:not(:focus-within)) button.add {
            display: inline-block;
            white-space: nowrap;
            color: transparent;
            line-height: 0;
            font-size: 0;
            width: 100%;
          }

          :host([value="0"]:not(:focus-within)) button.add:after {
            content: 'Выбрать';
            border-radius: inherit;
            display: inline-block;
            font-weight: normal;
            padding-right: 15px;
            padding-left: 15px;
            line-height: 38px;
            font-size: 16px;
            color: black;
          }
        `]
    }

    updateValue() {
        if (!this.input.value.reportValidity()) return;
        this.value = parseInt(this.input.value.value) || '0';
    }

    render() {
        return html`
            <span class="title"><slot>${this.title}</slot></span>
            <span class="count">
                <button @click="${() => this.input.value.stepDown() || this.updateValue()}">-</button>
                <input type="number" placeholder="0" max="99" min="0" inputmode="numeric" ${ref(this.input)}
                       .value="${live(this.value || 0)}" @change="${this.updateValue}" @input="${this.updateValue}">
                <button @click="${() => this.input.value.stepUp() || this.updateValue()}" class="add">+</button>
            </span>`
    }
}

customElements.define('product-variant', ProductVariant)
