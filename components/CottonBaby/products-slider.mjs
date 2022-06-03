import {css, html, LitElement} from "lit"
import './product-card.mjs'

export class ProductsSlider extends LitElement {
    static get styles() {
        return css`
          :host {
            display: flex;
            padding-bottom: var(--root-padding);
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
            gap: var(--root-padding);
            overflow-x: scroll;
            will-change: scroll-position;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          :host:after {
            content: '';
            height: 1px;
            display: block;
            min-width: 1px;
            margin-left: -1px;
          }

          product-card {
            min-width: calc(100% - (var(--root-padding) * 2));
            scroll-snap-align: center;
          }

          @media (min-width: 1024px) {
            product-card {
              min-width: 360px;
            }
          }
        `
    }

    render() {
        return html`
            <product-card src="https://cottonbaby.ru/images/pictures/i5.jpg"></product-card>
            <product-card src="https://cottonbaby.ru/images/pictures/i2.jpg"></product-card>
            <product-card src="https://cottonbaby.ru/images/pictures/i4.jpg"></product-card>
            <product-card src="https://cottonbaby.ru/images/pictures/i3.jpg"></product-card>
            <product-card src="https://cottonbaby.ru/images/pictures/i1.jpg"></product-card>
        `
    }
}

customElements.define('products-slider', ProductsSlider)
