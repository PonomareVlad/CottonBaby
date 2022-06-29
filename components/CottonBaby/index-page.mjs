import {css, html, LitElement} from "lit"
import './app-hero.mjs'
import './hero-slider.mjs'
import './product-hero.mjs'
import './categories-list.mjs'
import './products-slider.mjs'
import './drag-scroll.mjs'

export class IndexPage extends LitElement {
    static get styles() {
        return css`
          .hero-slider {
            height: 100%;
          }

          .hero-slider::part(container) {
            height: 100%;
            --gap: 0;
            --padding-left: 0;
            --padding-right: 0;
            --padding-bottom: 0;
          }

          .hero-slider::part(next):before {
            content: 'Листайте, чтобы смотреть еще';
            font-size: initial;
            display: inline;
            color: initial;
            line-height: var(--size);
          }

          categories-list {
            margin: var(--root-padding) 0;
          }

          products-slider {
            margin: var(--root-padding) 0;
          }

          .root-padding {
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
          }

          .images-slider img {
            min-width: calc(100% - (var(--root-padding) * 2));
            border-radius: 20px;
            object-fit: cover;
            display: block;
            aspect-ratio: 3/2;
          }

          .about {
            padding-bottom: var(--root-padding-bottom);
          }

          @media (max-width: 1023px) {
            .hero-slider::part(next) {
              --backdrop-filter: blur(10px);
              --size: 30px;
              box-sizing: border-box;
              padding: unset;
              padding-right: 18px;
              position: absolute;
              display: block;
              height: auto;
              width: auto;
              left: 50%;
              font-size: 0;
              border: none;
              line-height: 0;
              min-width: 285px;
              text-align: center;
              border-radius: 100px;
              background-size: 8px;
              bottom: var(--root-padding);
              background-repeat: no-repeat;
              transform: translate(-50%, 0);
              background-position: center right 10px;
              backdrop-filter: var(--backdrop-filter);
              background-color: rgba(255, 255, 255, 0.7);
              -webkit-backdrop-filter: var(--backdrop-filter);
              background-image: url("/assets/images/arrow.svg");
              max-width: calc(100% - var(--root-padding-left) - var(--root-padding-right));
            }

          }

          @media (min-width: 350px) {
            .hero-slider::part(next) {
              min-width: 320px;
            }

            .hero-slider::part(next):before {
              background-size: 8px;
              font-size: 18px;
            }
          }

          @media (min-width: 1024px) {
            .hero-slider::part(next) {
              min-width: unset;
            }

            .hero-slider::part(next):before {
              top: 0;
              bottom: 0;
              width: 200px;
              display: flex;
              font-size: 24px;
              font-weight: 300;
              text-align: right;
              position: absolute;
              align-items: center;
              line-height: initial;
              justify-content: flex-end;
              text-shadow: 0 0 5px #fff;
              right: calc(var(--size) + 20px);
            }

            h2 {
              font-size: 48px;
            }

            .about {
              display: flex;
              max-width: 100%;
            }

            .content {
              min-width: 40%;
            }

            .images-slider {
              position: relative;
              flex-shrink: 1;
              min-width: 60%;
            }

            .images-slider:before {
              pointer-events: none;
              position: absolute;
              display: block;
              content: '';
              top: 0;
              left: 0;
              bottom: 0;
              width: calc(var(--root-padding) * 2);
              background: linear-gradient(to right, white 15.97%, transparent 42.44%);
            }
          }
        `
    }

    render() {
        this?.setMeta({title: 'Index'})
        return html`
            <drag-scroll class="hero-slider">
                <app-hero></app-hero>
                <product-hero
                        title="Слип шапочка Капучино"
                        description="Описание продукта с упоминанием его качеств и уникальных технологий производства"
                        src="https://cloudflare-ipfs.com/ipfs/bafybeihgc47txsvnuzo2dl34t3aibkichnc7crsyq7sjlsijtxvslsrrdm/IMG_4895-2.jpg"
                ></product-hero>
                <product-hero
                        title="Название продукта"
                        description="Описание продукта с упоминанием его качеств и уникальных технологий производства"
                        src="https://cottonbaby.ru/images/pictures/i1.jpg"
                ></product-hero>
                <product-hero
                        title="Название продукта"
                        description="Описание продукта с упоминанием его качеств и уникальных технологий производства"
                        src="https://cottonbaby.ru/images/pictures/i3.jpg"
                ></product-hero>
            </drag-scroll>
            <h2 class="root-padding" style="text-align: center">Наш каталог</h2>
            <categories-list class="root-padding"></categories-list>
            <h2 class="root-padding">Новинки</h2>
            <products-slider></products-slider>
            <div class="about">
                <div class="content">
                    <h2 class="root-padding">О производстве</h2>
                    <div class="root-padding">
                        <p>Краткое описание произовдства, которое можно настроить в бек-офисе.</p>
                        <p>Также, это описание отображается в результатах поиска Яндекс и Google и помогает в
                            продвижении
                            сайта.</p>
                    </div>
                </div>
                <drag-scroll class="images-slider" dragging="true">
                    <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p4.500x500.jpg" alt="Image">
                    <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p3.500x500.jpg" alt="Image">
                    <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p2.500x500.jpg" alt="Image">
                    <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p5.500x500.jpg" alt="Image">
                    <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p1.500x500.jpg" alt="Image">
                </drag-scroll>
            </div>`
    }
}

customElements.define('index-page', IndexPage)
