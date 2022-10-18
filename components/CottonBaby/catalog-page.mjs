import "./product-card.mjs"
import styles from "#styles"
import {chain} from "#lib/utils.mjs"
import {css, html, LitElement} from "lit"
import {live} from "lit/directives/live.js"
import {cache} from "lit/directives/cache.js"
import {syncUntil} from "#lib/directives.mjs"
import {repeat} from "lit/directives/repeat.js"
import Catalog from "#root/controllers/catalog.mjs"
import {ref, createRef} from "lit/directives/ref.js"

export class CatalogPage extends LitElement {
    catalog = new Catalog(this)
    collectionSelect = createRef()
    categorySelect = createRef()
    variantSelect = createRef()
    list = createRef()
    selectRefs = [this.collectionSelect, this.categorySelect, this.variantSelect]

    static get properties() {
        return {
            category: {type: Number},
            variant: {type: String},
            sort: {type: String},
            size: {type: String}
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
            --width: calc((var(--length) * 1ch) + (var(--padding) * 2) + 1ch);
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

    getPathByProps({category = this.category, sort = this.sort, variant = this.variant} = {}) {
        if (category !== this.category) variant = undefined;
        const path = ['catalog', category].filter(Boolean).join('/'),
            parameters = Object.fromEntries(Object.entries({sort, variant}).filter(([, value]) => value)),
            query = new URLSearchParams(parameters);
        return `/${path}${query ? `?${query}` : ''}`
    }

    propertyChange({target: {name, value}} = {}) {
        this.updateAllSelects();
        if (!name || !value || this[name] === value) return;
        const path = this.getPathByProps({[name]: value})
        history.pushState(null, null, path)
        return globalThis.router.goto(path)
    }

    renderProductCard({id, images, title, price, variants} = {}) {
        const href = `/product/${id}`,
            src = images && images[0] ? images[0] : '',
            variantsList = variants ? Object.values(variants).map(({title}) => title) : []
        return html`
            <product-card title="${title}" price="${price}" src="${src}" href="${href}"
                          .variants="${variantsList}"></product-card>`
    }

    /*intersect(elements = []) {
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
    }*/

    updated() {
        if (!this.category) this.categorySelect.value.selectedIndex = 0;
        if (!this.variant) this.variantSelect.value.selectedIndex = 0;
        this.updateAllSelects();
    }

    updateAllSelects() {
        return this.selectRefs.forEach(({value: select} = {}) => this.updateSelectLength(select))
    }

    updateSelectLength(select) {
        return select.style.setProperty('--length', select.selectedOptions.item(0).text.length)
    }

    filterProducts(products = []) {
        return products.filter(({variants} = {}) =>
            Object.values(variants).some(({title, count} = {}) =>
                typeof count === 'number' && count > 0 && (this.variant ? this.variant === title : true))
        )
    }

    filterVariants(variants = []) {
        return [...new Set(variants.map(({title} = {}) => title).filter(Boolean))].sort((a, b) => parseInt(a) - parseInt(b))
    }

    render() {
        const filter = {}, options = {}
        if (this.category) filter.category = this.category
        options.sort = this.sort === 'price' ? {price: 1} : {id: -1}
        const products = chain(this.catalog.fetchProducts(filter, options), this.filterProducts.bind(this)),
            variants = chain(this.catalog.fetchVariants(filter, options), this.filterVariants.bind(this)),
            category = this.catalog.fetchCategoryByID(this.category),
            categories = this.catalog.fetchCategories();
        chain(category, ({title = 'Каталог'} = {}) => this?.setMeta({title}))
        return html`
            <h1 class="root-padding">${syncUntil(chain(category, ({title = 'Каталог'} = {}) => title), 'Каталог')}</h1>
            <div class="controls-section">
                <div class="controls">
                    <select class="button" name="category" @change="${this.propertyChange}" ${ref(this.categorySelect)}>
                        <option selected disabled>Категория</option>
                        ${syncUntil(chain(categories, categories => categories.map(({id, title}) => html`
                            <option value="${id}" ?selected="${(this.category === id)}">${title}</option>`)))}
                    </select>
                    <select class="button" name="collection" @change="${this.propertyChange}"
                            ${ref(this.collectionSelect)}>
                        <option selected disabled>Коллекция</option>
                        <option>Коллекция 1</option>
                        <option>Коллекция 2</option>
                        <option>Коллекция 3</option>
                    </select>
                    <select class="button" name="variant" @change="${this.propertyChange}" ${ref(this.variantSelect)}>
                        <option selected disabled>Размер</option>
                        ${syncUntil(chain(variants, variants => variants.map(variant => html`
                            <option value="${variant}" ?selected="${(this.variant === variant)}">${variant}
                            </option>`)))}
                    </select>
                </div>
                <div class="controls">Сортировка:
                    <input value="date" name="sort" type="radio" id="sort_date" @change="${this.propertyChange}"
                           .checked="${live(this.sort !== 'price')}">
                    <label for="sort_date" class="button">По дате</label>
                    <input value="price" name="sort" type="radio" id="sort_price" @change="${this.propertyChange}"
                           .checked="${live(this.sort === 'price')}">
                    <label for="sort_price" class="button">По цене</label>
                </div>
            </div>
            <section class="root-padding products-list" ${ref(this.list)}>
                ${cache(syncUntil(chain(products, products => repeat(products, ({id} = {}) => id, this.renderProductCard))))}
            </section>
        `
    }
}

customElements.define('catalog-page', CatalogPage)
