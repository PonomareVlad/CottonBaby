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
            --inner-gap: 1ch;
            gap: var(--inner-gap);
            font-size: 18px;
            line-height: 38px;
            font-weight: bold;
            user-select: none;
            padding-left: 15px;
            border-radius: 20px;
            white-space: nowrap;
            display: inline-flex;
            justify-content: space-between;
            border: solid 1px rgba(151, 151, 151, 0.54);
          }

          .title {
            width: 100%;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .count {
            position: relative;
            display: inline-flex;
            /*max-width: calc((100% - var(--inner-gap)) / 2);*/
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
            line-height: inherit;
            font-weight: inherit;
            font-size: inherit;
            background: none;
            color: inherit;
            min-width: 40px;
            border: none;
            width: 40px;
            padding: 0;
            margin: 0;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          :host([value="0"]:not(:focus-within)) {
            padding-right: 15px;
            border: solid 1px transparent;
            background-color: rgba(120, 120, 128, 0.16);
          }

          :host([value="0"]:not(:focus-within)) .count {
            min-width: 6.5ch;
            max-width: 6.5ch;
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
            display: inline-block;
            content: 'Выбрать';
            font-weight: normal;
            line-height: 38px;
            font-size: 16px;
            color: black;
            width: 100%;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
