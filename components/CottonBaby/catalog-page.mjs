import {css, html, LitElement} from "lit"
import styles from "#styles"
import './product-card.mjs'
import {chain} from "#lib/utils.mjs";
import {syncUntil} from "#lib/directives.mjs";
import {ref, createRef} from 'lit/directives/ref.js'
import Catalog from "#root/controllers/catalog.mjs";

export class CatalogPage extends LitElement {
    catalog = new Catalog(this)
    list = createRef()

    static get properties() {
        return {
            category: {type: Number, reflect: true},
            variant: {type: String, reflect: true},
            sort: {type: String, reflect: true}
        }
    }

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

          .controls input {
            display: none;
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

          input[type="radio"]:checked + label {
            background-color: transparent;
          }

          .products-list {
            display: flex;
            flex-direction: column;
            gap: var(--root-padding);
            padding-bottom: var(--root-padding-bottom);
          }

          .products-list .hidden {
            visibility: hidden;
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
              /*max-width: initial;
              overflow-x: initial;
              text-overflow: initial;*/
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

    categoryChange(e) {
        if (this.category !== e.target.value) history.pushState(null, null, `/catalog/${e.target.value}`)
        this.category = e.target.value
    }

    sortChange(e) {
        if (this.sort !== e.target.value) history.pushState(null, null, `?sort=${e.target.value}`)
        this.sort = e.target.value
    }

    renderProductCard({id, images, title, price, variants} = {}) {
        const href = `/product/${id}`,
            src = images && images[0] ? images[0] : '',
            variantsList = variants ? Object.values(variants).map(({title}) => title) : []
        return html`
            <product-card title="${title}" price="${price}" src="${src}" href="${href}"
                          .variants="${variantsList}"></product-card>`
    }

    intersect(elements = []) {
        const visibleElements = elements.filter(({isIntersecting}) => isIntersecting).map(({target}) => target)

        if (!visibleElements.length) return;

        let prevElement = visibleElements.at(0).previousElementSibling, remainPrev = 30,
            nextElement = visibleElements.at(-1).nextElementSibling, remainNext = 30

        while (remainPrev-- > 0 && prevElement) {
            visibleElements.unshift(prevElement)
            prevElement = prevElement.previousElementSibling
        }
        while (remainNext-- > 0 && nextElement) {
            visibleElements.push(nextElement)
            nextElement = nextElement.nextElementSibling
        }

        Array.from(this.list.value.children).forEach(element =>
            element.classList.toggle('hidden', !visibleElements.includes(element)))
    }

    connectedCallback() {
        super.connectedCallback()
        this.observer = new IntersectionObserver(elements =>
            requestAnimationFrame(this.intersect.bind(this, elements)), {threshold: 0});
    }

    updated() {
        Array.from(this.list.value.children).forEach(this.observer.observe.bind(this.observer))
    }

    render() {
        const filter = {}, options = {}
        if (this.category) filter.category = this.category
        options.sort = this.sort === 'price' ? {price: 1} : {id: -1}
        const products = this.catalog.fetchProducts(filter, options),
            category = this.catalog.fetchCategoryByID(this.category),
            categories = this.catalog.fetchCategories(),
            variants = chain(this.catalog.fetchVariants(), variants =>
                [...new Set(variants.map(({title} = {}) => title))].sort((a, b) => parseInt(a) - parseInt(b)))
        chain(category, ({title = 'Каталог'} = {}) => this?.setMeta({title}))
        return html`
            <h1 class="root-padding">${syncUntil(chain(category, ({title = 'Каталог'} = {}) => title), 'Каталог')}</h1>
            <div class="controls-section">
                <div class="controls">
                    <select class="button" style="--length: 15" @change="${this.categoryChange}">
                        <option selected disabled>Категория</option>
                        ${syncUntil(chain(categories, categories => categories.map(({id, title}) => html`
                            <option value="${id}" ?selected="${this.category === id}">${title}</option>`)))}
                    </select>
                    <select class="button" style="--length: 10">
                        <option selected disabled>Коллекция</option>
                        <option>Коллекция 1</option>
                        <option>Коллекция 2</option>
                        <option>Коллекция 3</option>
                    </select>
                    <select class="button" style="--length: 10">
                        <option selected disabled>Размер</option>
                        ${syncUntil(chain(variants, variants => variants.map(variant => html`
                            <option value="${variant}" ?selected="${this.variant === variant}">${variant}</option>`)))}
                    </select>
                </div>
                <div class="controls">Сортировка:
                    <input value="date" name="sort" type="radio" id="sort_date" @change="${this.sortChange}"
                           ?checked="${this.sort !== 'price'}">
                    <label for="sort_date" class="button">По дате</label>
                    <input value="price" name="sort" type="radio" id="sort_price" @change="${this.sortChange}"
                           ?checked="${this.sort === 'price'}">
                    <label for="sort_price" class="button">По цене</label>
                </div>
            </div>
            <section class="root-padding products-list" ${ref(this.list)}>
                ${syncUntil(chain(products, products => products.map(this.renderProductCard)), 'Загрузка ...')}
            </section>
        `
    }
}

customElements.define('catalog-page', CatalogPage)
