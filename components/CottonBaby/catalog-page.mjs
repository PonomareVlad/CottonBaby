import {css, html, LitElement} from "lit"
import styles from "#styles"
import './product-card.mjs'
import {db} from "#db";
import {chain} from "#lib/utils.mjs";
import {syncUntil} from "#lib/directives.mjs";

export class CatalogPage extends LitElement {
    static get styles() {
        return [styles, css`
          :host {
            height: 100%;
            display: block;
            padding-top: var(--header-height);
          }

          .controls {
            --gap: 10px;
            display: flex;
            margin: 20px 0;
            gap: var(--gap);
            overflow-x: auto;
            align-items: center;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
          }

          .controls::-webkit-scrollbar {
            display: none;
          }

          .controls:after {
            content: '';
            height: 1px;
            display: block;
            /*margin-left: -1px;*/
            min-width: calc(var(--root-padding-right) - var(--gap));
          }

          .button {
            --size: 30px;
            --padding: calc(var(--size) / 2);
            -webkit-appearance: none;
            outline: none;
            margin: 1px 0;
            color: black;
            cursor: pointer;
            white-space: nowrap;
            display: inline-block;
            line-height: var(--size);
            border: 1px solid #d8d8d8;
            background-color: #d8d8d8;
            border-radius: var(--size);
            padding: 0 var(--padding);
          }

          select.button {
            --length: 10;
            --width: calc((var(--length) * 1ch) + (var(--padding) * 2));
            overflow-x: hidden;
            text-overflow: ellipsis;
            min-width: var(--width);
            max-width: var(--width);
          }

          .hidden {
            display: none;
          }

          input[type="radio"]:checked + label {
            background-color: transparent;
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

            .controls-section {
              display: flex;
              margin: 50px 0;
              padding-left: var(--root-padding-left);
              padding-right: var(--root-padding-right);
            }

            .controls {
              --gap: 20px;
              margin: 0;
              padding: 0;
            }

            select.button {
              min-width: initial;
              max-width: initial;
              overflow-x: initial;
              text-overflow: initial;
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
        `]
    }

    fetchProducts() {
        return chain(db.collection('products').find({}, {limit: 32}), data => data || [])
    }

    renderProductCard({id, images, title, price, variants} = {}) {
        const href = `/product/${id}`,
            src = images && images[0] ? images[0] : '',
            variantsList = variants ? Object.values(variants).map(({title}) => title) : []
        return html`
            <product-card title="${title}" price="${price}" src="${src}" href="${href}"
                          .variants="${variantsList}"></product-card>`
    }

    render() {
        const data = this.fetchProducts()
        this?.setMeta({title: 'Catalog'})
        return html`
            <h1 class="root-padding">Каталог</h1>
            <div class="controls-section">
                <div class="controls">
                    <select class="button" style="--length: 10">
                        <option selected disabled>Категория</option>
                        <option>Категория 1</option>
                        <option>Категория 2</option>
                        <option>Категория 3</option>
                    </select>
                    <select class="button" style="--length: 10">
                        <option selected disabled>Коллекция</option>
                        <option>Коллекция 1</option>
                        <option>Коллекция 2</option>
                        <option>Коллекция 3</option>
                    </select>
                    <select class="button" style="--length: 7">
                        <option selected disabled>Размер</option>
                        <option>10-20</option>
                        <option>20-30</option>
                        <option>30-40</option>
                    </select>
                </div>
                <div class="controls">Сортировка:
                    <input value="date" name="sort" type="radio" id="sort_date" class="hidden" checked>
                    <label for="sort_date" class="button">По дате</label>
                    <input value="price" name="sort" type="radio" id="sort_price" class="hidden">
                    <label for="sort_price" class="button">По цене</label>
                </div>
            </div>
            <section class="root-padding products-list">
                ${syncUntil(chain(data, products => products.map(this.renderProductCard)), 'Загрузка ...')}
            </section>
        `
    }
}

customElements.define('catalog-page', CatalogPage)
