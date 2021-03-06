import {css, html, LitElement} from "lit"
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {syncUntil} from "#lib/directives.mjs"
import './product-variant.mjs'
import {chain} from "#utils"
import styles from "#styles"
import {db} from '#db'

export class ProductPage extends LitElement {
    static get properties() {
        return {product: {type: Number}}
    }

    static get styles() {
        return [styles, css`
          :host {
            display: block;
            padding-top: var(--header-height);
            padding-bottom: var(--root-padding-bottom);
          }

          .back-button {
            --padding: 10px;
            z-index: 10;
            color: inherit;
            font-size: 14px;
            line-height: 30px;
            position: absolute;
            border-radius: 20px;
            padding-right: 10px;
            left: var(--padding);
            display: inline-flex;
            text-decoration: none;
            backdrop-filter: var(--backdrop-filter);
            -webkit-backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, var(--backdrop-opacity));
            top: calc(var(--header-height) + var(--padding));
          }

          .back-button:before {
            content: '';
            width: 25px;
            height: 30px;
            transform: scaleX(-1);
            display: inline-block;
            background-size: 5px;
            background-position: center left 10px;
            background-repeat: no-repeat;
            background-image: url("/assets/images/arrow.svg");
          }

          .product-gallery {
            --gap: 0;
            --padding-left: 0;
            --padding-right: 0;
            width: 100%;
          }

          .product-gallery img {
            aspect-ratio: 1;
            object-fit: cover;
            object-position: top;
          }

          .product-content {
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
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

          .price {
            padding: 0 1ch;
            line-height: 32px;
            border-radius: 30px;
            white-space: nowrap;
            display: inline-block;
            border: solid 1px black;
          }

          .price:after {
            content: ' ???';
            font-family: HelveticaNeue, sans-serif, -apple-system;
          }

          .product-code {
            margin-top: 0;
            color: #b1b1b1;
            font-size: 16px;
            margin-bottom: 0;
            font-weight: bold;
          }

          .product-code:before {
            content: '??????????????: '
          }

          .variants {
            --gap: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: var(--gap);
          }

          .variants > product-variant {
            width: calc((100% - var(--gap)) / 2);
          }

          product-card {
            min-width: calc(100% - (var(--root-padding) * 2));
          }

          @media (max-width: 350px) {
            .variants > product-variant {
              width: 100%;
            }
          }

          @media (min-width: 1024px) {
            :host {
              --inner-padding: 70px;
              padding-top: calc(var(--header-height) + var(--root-padding-top) + (var(--root-padding) / 2));
            }

            .back-button {
              position: initial;
              margin-bottom: 30px;
              margin-left: var(--root-padding-left);
              background-color: rgba(120, 120, 128, 0.16);
            }

            .product-section {
              display: flex;
              gap: var(--root-padding);
              margin-bottom: var(--root-padding);
              padding-left: var(--root-padding-left);
              padding-right: calc(var(--root-padding-right) * 2);
            }

            .product-gallery {
              max-width: 45%;
              aspect-ratio: 1;
              max-height: 500px;
            }

            .product-gallery::part(container) {
              border-radius: 40px;
            }

            .product-content {
              width: calc(55% - var(--root-padding));
              display: flex;
              padding: unset;
              flex-direction: column;
            }

            .title-row {
              gap: 30px;
              padding-top: unset;
              justify-content: flex-start;
            }

            .variants > product-variant {
              width: calc((100% - (var(--gap)) * 2) / 3);
            }

            product-card {
              min-width: 360px;
            }
          }
        `]
    }

    back(e) {
        e.preventDefault()
        history.back()
    }

    fetchProductDataByID(id = this.product) {
        return chain(db.collection('products').findOne({id}), data => data || {})
    }

    fetchCategoryProducts(category) {
        return chain(db.collection('products').find({category}, {limit: 16}), data => data || [])
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
        const data = this.fetchProductDataByID()
        const category = chain(data, ({category}) => this.fetchCategoryProducts(category))
        chain(data, ({title}) => this?.setMeta({title}))
        return html`
            <a href="../" class="back-button" @click="${this.back}">??????????</a>
            <div class="product-section">
                <drag-scroll class="product-gallery">
                    ${syncUntil(chain(data, ({images}) => images.map(image => html`<img src="${image}">`)), '')}
                </drag-scroll>
                <div class="product-content">
                    <div class="title-row">
                        <div class="title-content">
                            <h1 class="title">${syncUntil(chain(data, ({title}) => title), '')}</h1>
                            <p class="product-code">${syncUntil(chain(data, ({code}) => code), '')}</p>
                        </div>
                        <div class="price">${syncUntil(chain(data, ({price}) => price), '')}</div>
                    </div>
                    <br>
                    <p>????????????: ${syncUntil(chain(data, ({composition}) => composition), '')}</p>
                    <div>
                        <h2>?????????????? ?? ??????????????:</h2>
                        <div class="variants">
                            ${syncUntil(chain(data, ({variants}) => Object.values(variants).map(({title}) => html`
                                <product-variant>${title}</product-variant> `)), '')}
                        </div>
                    </div>
                    <br>
                    <div>
                        <h2>????????????????:</h2>
                        ${syncUntil(chain(data, ({description}) => description ? unsafeHTML(description) : ''), '')}
                    </div>
                </div>
            </div>
            <h2 class="root-padding">???? ???????? ??????????????????:</h2>
            <drag-scroll dragging="true">
                ${syncUntil(chain(category, products => [...products].reverse().map(this.renderProductCard)), '')}
            </drag-scroll>
            <h2 class="root-padding">?????????????? ????????????:</h2>
            <drag-scroll dragging="true">
                ${syncUntil(chain(category, products => products.map(this.renderProductCard)), '')}
            </drag-scroll>
        `
    }
}

customElements.define('product-page', ProductPage)
