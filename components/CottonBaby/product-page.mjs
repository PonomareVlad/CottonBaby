import {css, html, LitElement} from "lit"
import './product-gallery.mjs'
import styles from "#styles"

export class ProductPage extends LitElement {
    static get styles() {
        return [styles, css`
          :host {
            display: block;
            padding-top: var(--header-height);
          }

          .title-row {
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .title, .price {
            font-size: 24px;
          }

          .title {
            margin-top: 0;
            line-height: 34px;
            margin-bottom: 5px;
          }

          .product-code {
            margin-top: 0;
          }

          .price {
            padding: 0 1ch;
            line-height: 32px;
            border-radius: 30px;
            white-space: nowrap;
            display: inline-block;
            border: solid 1px black;
          }

          .price:after {
            content: ' ₽';
            font-family: HelveticaNeue, sans-serif, -apple-system;
          }

          .product-code {
            color: #b1b1b1;
            font-size: 16px;
            font-weight: bold;
          }

          .product-code:before {
            content: 'Артикул: '
          }

          @media (min-width: 1024px) {
            :host {
              padding-top: calc(var(--header-height) + var(--root-padding-top));
            }
          }
        `]
    }

    render() {
        this?.setMeta({title: 'Product'})
        return html`
            <product-gallery></product-gallery>
            <div class="root-padding title-row">
                <div class="title-content">
                    <h1 class="title">Название продукта</h1>
                    <p class="product-code">123456789</p>
                </div>
                <div class="price">100</div>
            </div>
            <div class="root-padding">Состав: 100% хлопок</div>
        `
    }
}

customElements.define('product-page', ProductPage)
