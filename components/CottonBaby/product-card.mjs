import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'

export class ProductCard extends LitElement {
    static get properties() {
        return {src: {type: String}, title: {type: String}}
    }

    static get styles() {
        return css`
          :host {
            display: block;
            aspect-ratio: 1;
            position: relative;
            overflow: hidden;
            z-index: 0;
          }

          .overlay {
            --backdrop-filter: blur(10px);
            -webkit-backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: var(--backdrop-filter);
            padding: var(--root-padding);
            border-radius: 25px;
            position: absolute;
            min-height: 40px;
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
          }

          .sizes span {
            font-weight: bold;
          }

          .price {
            --backdrop-filter: blur(15px);
            -webkit-backdrop-filter: var(--backdrop-filter);
            backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 100px;
            padding: 0 15px;
            font-size: 24px;
            line-height: 1.4;
            position: absolute;
            right: 10px;
            top: 10px;
          }

          .price:after {
            content: ' ₽';
            font-family: HelveticaNeue, sans-serif, -apple-system;
          }

          img.background {
            position: absolute;
            object-fit: cover;
            display: block;
            width: 100%;
            height: 100%;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 25px;
          }
        `
    }

    render() {
        return html`
            <div>
                <div class="overlay">
                    <h3 class="title">${this.title || 'Название продукта'}</h3>
                    <p class="sizes">Размеры: <span>10-20</span> <span>20-30</span> <span>30-40</span></p>
                </div>
                <div class="price">100</div>
                <img src="${ifDefined(this.src)}" class="background" alt="Product">
            </div>
        `
    }
}

customElements.define('product-card', ProductCard)
