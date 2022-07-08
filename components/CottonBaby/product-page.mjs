import {css, html, LitElement} from "lit"
import './product-gallery.mjs'
import './product-variant.mjs'
import styles from "#styles"

export class ProductPage extends LitElement {
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
            content: ' ₽';
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
            content: 'Артикул: '
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

            product-gallery {
              max-width: 45%;
              aspect-ratio: 1;
              max-height: 500px;
            }

            .product-content {
              width: calc(55% - var(--root-padding));
              display: flex;
              padding: unset;
              flex-direction: column;
              justify-content: space-between;
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

    render() {
        this?.setMeta({title: 'Product'})
        return html`
            <a href="../" class="back-button" @click="${this.back}">Назад</a>
            <div class="product-section">
                <product-gallery></product-gallery>
                <div class="product-content">
                    <div class="title-row">
                        <div class="title-content">
                            <h1 class="title">Название продукта</h1>
                            <p class="product-code">123456789</p>
                        </div>
                        <div class="price">100</div>
                    </div>
                    <p>Состав: 100% хлопок</p>
                    <div>
                        <h2>Размеры в наличии:</h2>
                        <div class="variants">
                            <product-variant>10-20</product-variant>
                            <product-variant>20-30</product-variant>
                            <product-variant>30-40</product-variant>
                        </div>
                    </div>
                    <div>
                        <h2>Описание:</h2>
                        <p>Длинное описание продукта, которое можно настроить в бек-офисе или синхронизировать из
                            карточки
                            оптового сайта.</p>
                        <p>Также, это описание отображается в результатах поиска Яндекс и Google и помогает в
                            продвижении
                            страницы товара.</p>
                    </div>
                </div>
            </div>
            <h2 class="root-padding">Из этой коллекции:</h2>
            <drag-scroll dragging="true">
                <product-card href="/product/5" src="https://cottonbaby.ru/images/pictures/i1.jpg"></product-card>
                <product-card href="/product/4" src="https://cottonbaby.ru/images/pictures/i3.jpg"></product-card>
                <product-card href="/product/3" src="https://cottonbaby.ru/images/pictures/i4.jpg"></product-card>
                <product-card href="/product/2" src="https://cottonbaby.ru/images/pictures/i2.jpg"></product-card>
                <product-card href="/product/1" src="https://cottonbaby.ru/images/pictures/i5.jpg"></product-card>
            </drag-scroll>
            <h2 class="root-padding">Похожие товары:</h2>
            <products-slider></products-slider>
        `
    }
}

customElements.define('product-page', ProductPage)
