import {css, html, LitElement} from "lit"
import './product-card.mjs'

export class ProductsSlider extends LitElement {
    static get styles() {
        return css`
          :host {
            display: block;
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
          }
        `
    }

    render() {
        return html`
            <product-card src="https://cottonbaby.ru/images/pictures/i5.jpg"></product-card>
        `
    }
}

customElements.define('products-slider', ProductsSlider)
