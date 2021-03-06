import {css, html, LitElement} from "lit"
import './product-card.mjs'
import './drag-scroll.mjs'

export class ProductsSlider extends LitElement {
    static get styles() {
        return css`
          :host {
            display: block;
          }

          product-card {
            min-width: calc(100% - (var(--root-padding) * 2));
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
            <drag-scroll dragging="true">
                <product-card href="/product/1" src="https://cottonbaby.ru/images/pictures/i5.jpg"></product-card>
                <product-card href="/product/2" src="https://cottonbaby.ru/images/pictures/i2.jpg"></product-card>
                <product-card href="/product/3" src="https://cottonbaby.ru/images/pictures/i4.jpg"></product-card>
                <product-card href="/product/4" src="https://cottonbaby.ru/images/pictures/i3.jpg"></product-card>
                <product-card href="/product/5" src="https://cottonbaby.ru/images/pictures/i1.jpg"></product-card>
            </drag-scroll>
        `
    }
}

customElements.define('products-slider', ProductsSlider)
