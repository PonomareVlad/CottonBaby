import {css, html, LitElement} from "lit"
import './product-card.mjs'

export class CatalogPage extends LitElement {
    static get styles() {
        return css`
          :host {
            height: 100%;
            display: block;
            padding-top: var(--header-height);
          }

          .root-padding {
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
          }

          .products-list {
            display: flex;
            flex-direction: column;
            gap: var(--root-padding);
            padding-bottom: var(--root-padding-bottom);
          }

          @media (min-width: 1024px) {
            :host {
              padding-top: calc(var(--header-height) + var(--root-padding-top));
            }

            h1 {
              font-size: 48px;
            }
          }

          @media (min-width: 500px) {
            .products-list {
              flex-wrap: wrap;
              flex-direction: row;
            }

            product-card {
              width: calc((100% - var(--root-padding)) / 2);
            }
          }

          @media (min-width: 1200px) {
            product-card {
              width: calc((100% - (var(--root-padding) * 2)) / 3);
            }
          }
        `
    }

    render() {
        this?.setMeta({title: 'Catalog'})
        return html`
            <h1 class="root-padding">Каталог</h1>
            <section class="root-padding products-list">
                <product-card src="https://cottonbaby.ru/images/pictures/i5.jpg"></product-card>
                <product-card src="https://cottonbaby.ru/images/pictures/i2.jpg"></product-card>
                <product-card src="https://cottonbaby.ru/images/pictures/i4.jpg"></product-card>
                <product-card src="https://cottonbaby.ru/images/pictures/i3.jpg"></product-card>
                <product-card src="https://cottonbaby.ru/images/pictures/i1.jpg"></product-card>
            </section>
        `
    }
}

customElements.define('catalog-page', CatalogPage)
