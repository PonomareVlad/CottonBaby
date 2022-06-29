import {css, html, LitElement} from "lit"
import './product-gallery.mjs'
import styles from "#styles"

export class ProductPage extends LitElement {
    static get styles() {
        return [styles, css`
          :host {
            padding-top: var(--header-height);
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
            <div class="root-padding"><h1>Название продукта</h1></div>
        `
    }
}

customElements.define('product-page', ProductPage)
