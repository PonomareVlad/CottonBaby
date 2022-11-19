import Catalog from "#root/controllers/catalog.mjs"
import {css, html, LitElement} from "lit"
import {serverUntil} from "@lit-async/ssr-client/directives/server-until.js";
import {chain} from "#utils"
import './category-card.mjs'

export class CategoriesList extends LitElement {
    catalog = new Catalog(this)

    static get styles() {
        return css`
          :host {
            display: block;
          }

          section {
            display: flex;
            flex-wrap: wrap;
            gap: var(--root-padding);
          }

          category-card {
            width: calc((100% - var(--root-padding)) / 2)
          }

          .button {
            height: 40px;
            display: flex;
            color: inherit;
            margin: 30px auto;
            max-width: 500px;
            align-items: center;
            border-radius: 15px;
            text-decoration: none;
            justify-content: center;
            background-color: #d8d8d8;
          }

          @media (min-width: 1024px) {
            category-card {
              width: calc((100% - (var(--root-padding) * 3)) / 4)
            }

            .button {
              height: 60px;
              font-size: 24px;
              border-radius: 24px;
              margin: var(--root-padding) auto;
            }
          }
        `
    }

    renderCategoriesList() {
        return serverUntil(chain(this.catalog.fetchCategoriesWithProducts(),
            categories => Object.values(categories).splice(0, 8).map(({title, id, products} = {}) => {
                const href = `/catalog/${id}`, src = products.reduce((image, {images} = {}) =>
                    image || Array.isArray(images) ? images.shift() : undefined, undefined)
                return html`
                    <category-card href="${href}" title="${title}" src="${src}"></category-card>`
            })), Array(4).fill(null).map(() => html`
            <category-card></category-card>`))
    }

    render() {
        return html`
            <section>${this.renderCategoriesList()}</section>
            <a href="/catalog" class="button">Посмотреть все категории</a>
        `
    }
}

customElements.define('categories-list', CategoriesList)
