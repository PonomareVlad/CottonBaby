import {css, html, LitElement} from "lit"
import './product-gallery.mjs'
import styles from "#styles"

export class ProductPage extends LitElement {
    static get styles() {
        return [styles, css`
          :host {
            height: 100%;
            display: block;
            padding-top: var(--header-height);
          }

          @media (min-width: 1024px) {
            :host {
              padding-top: calc(var(--header-height) + var(--root-padding-top));
            }

            h2 {
              font-size: 48px;
            }
          }
        `]
    }

    render() {
        return html`
            <product-gallery></product-gallery>
            <div class="root-padding"><h2>Название продукта</h2></div>
        `
    }
}

customElements.define('product-page', ProductPage)
