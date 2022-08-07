import {css, html, LitElement} from "lit";
import {all, chain} from "#utils"
import './product-variant.mjs'
import styles from "#styles"
import Cart from "#root/controllers/cart.mjs";
import {repeat} from 'lit/directives/repeat.js';
import {syncUntil} from "svalit/directives.mjs";
import Catalog from "#root/controllers/catalog.mjs";

export class AppCart extends LitElement {
    catalog = new Catalog(this)
    cart = new Cart(this)

    static get properties() {
        return {hydrated: {state: true}}
    }

    static get styles() {
        return [styles, css`
          :host {
            --checkout-size: 60px;
          }

          .products-section {
            gap: 40px;
            display: flex;
            flex-direction: column;
            padding-bottom: var(--checkout-size);
          }

          .product {
            gap: 20px;
            display: flex;
            flex-direction: column;
          }

          .product-content {
            gap: 20px;
            display: flex;
            color: inherit;
            text-decoration: none;
            align-items: flex-start;
          }

          img {
            --size: 57px;
            aspect-ratio: 1;
            object-fit: cover;
            width: var(--size);
            height: var(--size);
            border-radius: 17px;
          }

          .title-content .title {
            font-size: 24px;
            margin-top: unset;
            margin-bottom: 5px;
            line-height: initial;
          }

          .title-content .product-code {
            margin-top: 0;
            color: #b1b1b1;
            font-size: 16px;
            margin-bottom: 0;
            font-weight: bold;
          }

          .title-content .product-code:before {
            content: 'Артикул: '
          }

          .price-content {
            display: flex;
            font-size: 24px;
            align-items: center;
            justify-content: space-between;
          }

          .symbol {
            --size: 20px;
            height: 100%;
            display: flex;
            width: var(--size);
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }

          .symbol.equals:before, .symbol.equals:after,
          .symbol.multiply:before, .symbol.multiply:after {
            content: '';
            height: 1px;
            margin: 4px;
            display: block;
            width: var(--size);
            border-radius: 0.5px;
            background-color: #979797;
          }

          .symbol.multiply:before, .symbol.multiply:after {
            transform: rotate(45deg);
            transform-origin: center;
          }

          .symbol.multiply:after {
            width: 1px;
            position: absolute;
            height: var(--size);
          }

          .price, .count {
            padding: 0 1ch;
            min-width: 34px;
            line-height: 32px;
            text-align: center;
            border-radius: 30px;
            white-space: nowrap;
            display: inline-block;
            border: solid 1px black;
          }

          .count {
            padding: 0 .5ch;
            border: solid 1px #979797;
          }

          .price:after {
            content: ' ₽';
            font-family: HelveticaNeue, sans-serif, -apple-system;
          }

          .price.summary {
            background-color: rgb(233 233 235);
          }

          .variants {
            --gap: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: var(--gap);
            position: relative;
          }

          .variants > product-variant {
            width: calc((100% - var(--gap)) / 2);
          }

          .checkout {
            left: 0;
            right: 0;
            bottom: 0;
            gap: 10px;
            display: flex;
            color: inherit;
            position: fixed;
            font-size: 20px;
            align-items: center;
            text-decoration: none;
            justify-content: center;
            background-color: #E9E9E9;
            height: var(--checkout-size);
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-left);
          }

          .checkout:before {
            content: 'Заказ на';
          }

          .checkout:after {
            content: 'оформить';
          }

          @media (max-width: 350px) {
            .variants > product-variant {
              width: 100%;
            }
          }

          @media (min-width: 1024px) {
            :host:before {
              content: 'Корзина';
              font-size: 34px;
              font-weight: 600;
              position: absolute;
              left: var(--root-padding);
              line-height: var(--checkout-size);
              top: calc(var(--root-padding) / 2);
            }

            .products-section {
              --gap: var(--root-padding);
              gap: var(--gap);
              flex-wrap: wrap;
              flex-direction: row;
              padding-bottom: unset;
              padding-top: calc(var(--root-padding) * 1.25);
            }

            .products-section > .product {
              width: calc((100% - var(--gap)) / 2);
            }

            .checkout {
              left: unset;
              bottom: unset;
              position: absolute;
              padding-left: 25px;
              padding-right: 13px;
              justify-content: space-between;
              top: calc(var(--root-padding) / 2);
              border-radius: var(--checkout-size);
              right: calc(var(--root-padding) / 2);
            }

            .checkout:before {
              content: 'Нажмите, чтобы оформить заказ на';
            }

            .checkout:after {
              content: none;
            }
          }

        `]
    }

    productTemplate({id, images, title, code, price, variants} = {}, cartItem = {}) {
        const href = `/product/${id}`,
            pid = id,
            count = cartItem ? Object.values(cartItem).reduce((a, b) => a + b, 0) : 0,
            src = images && images[0] ? images[0] : '',
            sum = (parseInt(price) || 0) * count
        return html`
            <div class="product">
                <a href="${href}" class="product-content">
                    <img src="${src}">
                    <div class="title-content">
                        <h1 class="title">${title}</h1>
                        <p class="product-code">${code}</p>
                    </div>
                </a>
                <div class="price-content">
                    <div class="price">${price}</div>
                    <div class="multiply symbol"></div>
                    <div class="count">${count}</div>
                    <div class="equals symbol"></div>
                    <div class="summary price">${sum}</div>
                </div>
                <div class="variants">
                    ${variants ? Object.values(variants).map(({id, title} = {}) => html`
                        <product-variant value="${cartItem[id] || '0'}" title="${title}" id="${id}"
                                         .product="${pid}"></product-variant>`) : ''}
                </div>
            </div>`
    }

    renderProductsList() {
        const productsList = Object.entries(this.cart.getItems())
        return repeat(productsList, ([id]) => id, ([id, item]) =>
            syncUntil(chain(this.catalog.fetchProductDataByID(id),
                    product => this.productTemplate(product, item)),
                this.productTemplate({title: 'Загрузка...', price: 0})))
    }

    renderCartPrice() {
        const productsList = Object.entries(this.cart.getItems()),
            productsData = all(productsList.map(([id]) => this.catalog.fetchProductDataByID(id))),
            sum = () => productsList.map(([id, item]) => this.productSum(id, item)).reduce((a, b) => a + b, 0)
        return syncUntil(chain(productsData, sum, sum => sum ? html`<a href="/checkout" class="checkout">
            <div class="price">${sum}</div>
        </a>` : html`<p>Корзина пуста</p>`))
    }

    productSum(id, cartItem = {}) {
        const {price} = this.catalog.fetchProductDataByID(id)
        return parseFloat(price) * Object.values(cartItem).reduce((a, b) => a + b, 0)
    }

    firstUpdated() {
        this.addEventListener('change', (event, variant = event.composedPath().shift()) =>
            this.cart.setItem(variant.product, {[variant.id]: parseInt(variant.value)}))
        this.hydrated = true
    }

    render() {
        return this.hydrated ? html`
            <div class="products-section">${this.renderProductsList()}</div>
            ${this.renderCartPrice()}
        ` : html`
            <div class="products-section"><p>Загрузка данных...</p></div>`
    }
}

customElements.define('app-cart', AppCart)
