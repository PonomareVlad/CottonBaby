import {css, html, LitElement} from "lit"
import './app-header.mjs'
import './app-hero.mjs'
import './hero-slider.mjs'
import './product-hero.mjs'
import './categories-list.mjs'
import './products-slider.mjs'
import './drag-scroll.mjs'

export class AppRoot extends LitElement {
    static get styles() {
        return css`
          @supports (padding-top: env(safe-area-inset-top)) {
            :host {
              --safe-padding-top: env(safe-area-inset-top);
              --safe-padding-left: env(safe-area-inset-left);
              --safe-padding-right: env(safe-area-inset-right);
              --safe-padding-bottom: env(safe-area-inset-bottom);
            }
          }

          :host {
            --root-padding: 20px;
            --root-padding-top: max(var(--safe-padding-top), var(--root-padding));
            --root-padding-left: max(var(--safe-padding-left), var(--root-padding));
            --root-padding-right: max(var(--safe-padding-right), var(--root-padding));
            --root-padding-bottom: max(var(--safe-padding-bottom), var(--root-padding));
            --header-height: 50px;
            height: 100%;
            display: block;
          }

          app-header {
            --height: var(--header-height);
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }

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

          @media (min-width: 1024px) {
            :host {
              --header-height: 80px;
              --root-padding: 60px;
            }

            app-header {
              top: var(--root-padding);
              position: absolute;
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
        return html`
            <app-header></app-header>
            <app-page>
                <drag-scroll class="hero-slider">
                    <app-hero></app-hero>
                    <product-hero
                            title="Слип шапочка Капучино"
                            description="Описание продукта с упоминанием его качеств и уникальных технологий производства"
                            src="https://cloudflare-ipfs.com/ipfs/bafybeihgc47txsvnuzo2dl34t3aibkichnc7crsyq7sjlsijtxvslsrrdm/IMG_4895-2.jpg"
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
                    <drag-scroll class="images-slider">
                        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p4.500x500.jpg" alt="Image">
                        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p3.500x500.jpg" alt="Image">
                        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p2.500x500.jpg" alt="Image">
                        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p5.500x500.jpg" alt="Image">
                        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p1.500x500.jpg" alt="Image">
                    </drag-scroll>
                </div>
            </app-page>
        `
    }
}

customElements.define('app-root', AppRoot)
