import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'

export class ProductCard extends LitElement {
    static get properties() {
        return {
            variants: {type: Array},
            title: {type: String},
            price: {type: Number},
            href: {type: String},
            src: {type: String}
        }
    }

    static get styles() {
        return css`
          :host {
            --border-radius: 25px;
            display: block;
            aspect-ratio: 1;
            position: relative;
          }

          a {
            display: block;
            color: inherit;
            text-decoration: none;
          }

          .overlay {
            -webkit-backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, var(--backdrop-opacity));
            backdrop-filter: var(--backdrop-filter);
            border-radius: var(--border-radius);
            position: absolute;
            min-height: 40px;
            padding: 20px;
            z-index: 1;
            bottom: 0;
            right: 0;
            left: 0;
          }

          @media (min-width: 350px) {
            .overlay {
              font-size: 18px;
            }
          }

          .overlay :first-child {
            margin-top: 0;
          }

          .overlay :last-child {
            margin-bottom: 0;
          }

          .title {
            font-weight: bold;
            font-size: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .sizes {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .sizes span {
            font-weight: bold;
          }

          .price {
            --padding: 10px;
            -webkit-backdrop-filter: var(--backdrop-filter);
            backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, var(--backdrop-opacity));
            border-radius: 100px;
            z-index: 1;
            padding: 0 15px;
            font-size: 24px;
            line-height: 1.4;
            position: absolute;
            right: var(--padding);
            top: var(--padding);
          }

          .price:after {
            content: ' ???';
            font-family: HelveticaNeue, sans-serif, -apple-system;
          }

          img.background {
            object-position: top;
            position: absolute;
            object-fit: cover;
            display: block;
            width: 100%;
            height: 100%;
            z-index: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: var(--border-radius);
          }

          @media (min-width: 1024px) {
            :host {
              --border-radius: 40px;
            }

            .overlay {
              padding: 25px;
            }

            .price {
              --padding: 20px;
              font-size: 30px;
            }
          }
        `
    }

    render() {
        return html`
            <a href="${this.href || '/catalog/category/product'}">
                <div class="overlay">
                    <h3 class="title">${this.title || '???????????????? ????????????????'}</h3>
                    <p class="sizes">??????????????:
                        ${this.variants ? this.variants.map(variant => html` <span>${variant}</span> `) :
                                html` <span>10-20</span> <span>20-30</span> <span>30-40</span>`}</p>
                </div>
                <div class="price">${this.price || 100}</div>
                <img src="${ifDefined(this.src)}" class="background" loading="lazy" decoding="async">
            </a>
        `
    }
}

customElements.define('product-card', ProductCard)
