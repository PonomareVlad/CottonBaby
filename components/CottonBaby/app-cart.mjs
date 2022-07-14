import {css, html, LitElement} from "lit"
import './product-variant.mjs'
import styles from "#styles"

export class AppCart extends LitElement {
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

    render() {
        return html`
            <div class="products-section">
                <div class="product">
                    <a href="/product/1" class="product-content">
                        <img src="https://cloudflare-ipfs.com/ipfs/bafybeihgc47txsvnuzo2dl34t3aibkichnc7crsyq7sjlsijtxvslsrrdm/IMG_4895-2.jpg"
                             alt="Image">
                        <div class="title-content">
                            <h1 class="title">Слип шапочка Капучино</h1>
                            <p class="product-code">123456789</p>
                        </div>
                    </a>
                    <div class="price-content">
                        <div class="price">100</div>
                        <div class="multiply symbol"></div>
                        <div class="count">1</div>
                        <div class="equals symbol"></div>
                        <div class="summary price">100</div>
                    </div>
                    <div class="variants">
                        <product-variant value="1">10-20</product-variant>
                        <product-variant>20-30</product-variant>
                        <product-variant>30-40</product-variant>
                    </div>
                </div>
                <div class="product">
                    <a href="/product/2" class="product-content">
                        <img src="https://cloudflare-ipfs.com/ipfs/bafybeihh7elsjpovblkglgve6b6mvgryljgn7be47xgttelv3crmllh2wq/1.jpg"
                             alt="Image">
                        <div class="title-content">
                            <h1 class="title">Название товара</h1>
                            <p class="product-code">123456789</p>
                        </div>
                    </a>
                    <div class="price-content">
                        <div class="price">100</div>
                        <div class="multiply symbol"></div>
                        <div class="count">1</div>
                        <div class="equals symbol"></div>
                        <div class="summary price">100</div>
                    </div>
                    <div class="variants">
                        <product-variant value="1">10-20</product-variant>
                        <product-variant>20-30</product-variant>
                        <product-variant>30-40</product-variant>
                    </div>
                </div>
            </div>
            <a href="/checkout" class="checkout">
                <div class="price">100</div>
            </a>
        `
    }
}

customElements.define('app-cart', AppCart)
