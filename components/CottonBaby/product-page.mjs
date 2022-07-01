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

          .product-code {
            margin-top: 0;
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
              padding-top: calc(var(--header-height) + var(--root-padding-top));
            }

            product-card {
              min-width: 360px;
            }
          }
        `]
    }

    render() {
        this?.setMeta({title: 'Product'})
        return html`
            <product-gallery></product-gallery>
            <div class="root-padding title-row">
                <div class="title-content">
                    <h1 class="title">Название продукта</h1>
                    <p class="product-code">123456789</p>
                </div>
                <div class="price">100</div>
            </div>
            <p class="root-padding">Состав: 100% хлопок</p>
            <h2 class="root-padding">Размеры в наличии:</h2>
            <div class="root-padding variants">
                <product-variant>10-20</product-variant>
                <product-variant>20-30</product-variant>
                <product-variant>30-40</product-variant>
            </div>
            <div class="root-padding">
                <h2>Описание:</h2>
                <p>Длинное описание продукта, которое можно настроить в бек-офисе или синхронизировать из карточки
                    оптового сайта.</p>
                <p>Также, это описание отображается в результатах поиска Яндекс и Google и помогает в продвижении
                    страницы товара.</p>
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
