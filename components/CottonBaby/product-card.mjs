import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'
import './app-image.mjs'

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
            padding: 10px 20px;
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

          .overlay :first-child,
          .overlay :last-child {
            margin: 0;
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
            content: ' ₽';
            font-family: HelveticaNeue, sans-serif, -apple-system;
          }

          .background {
            position: absolute;
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
              padding: 15px 25px;
            }

            .price {
              --padding: 20px;
              font-size: 30px;
            }
          }

          @media (hover: hover) {
            :host(:hover) .background {
              --img-transform: scale(1.05);
            }
          }
        `
    }

    render() {
        return html`
            <a href="${ifDefined(this.href)}">
                ${this.title || this.variants ? html`
                    <div class="overlay">
                        ${this.title ? html`<h3 class="title">${this.title}</h3>` : ''}
                        ${this.variants ? html`<p class="sizes">Размеры:
                            ${this.variants.map(variant => html` <span>${variant}</span> `)}</p>` : ''}
                    </div>` : ''}
                ${this.price ? html`
                    <div class="price">${this.price}</div>` : ''}
                <app-image src="${ifDefined(this.src)}" class="background" loading="lazy" decoding="async"
                           cdn="true" width="1024" quality="75"></app-image>
            </a>
        `
    }
}

customElements.define('product-card', ProductCard)
