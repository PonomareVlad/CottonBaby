import {css, html, LitElement} from "lit"
import './category-card.mjs'

const categories = [
    'https://cloudflare-ipfs.com/ipfs/bafybeiegxvs5wfga2jlcf7b2zrnqq3onsdjwevlrawjsaw7mh6ikozgf4y/2.jpg',
    'https://cottonbaby.ru/images/pictures/i2.jpg',
    'https://cloudflare-ipfs.com/ipfs/bafybeiff6zjwprspp33j2ex6xm3alxrnxaq56jufzpn4raykahio7esply/3.jpg',
    'https://cottonbaby.ru/images/pictures/i4.jpg',
    'https://cottonbaby.ru/images/pictures/i3.jpg',
    'https://cottonbaby.ru/images/pictures/i1.jpg'
]

export class CategoriesList extends LitElement {
    static get styles() {
        return css`
          :host {
            display: block;
          }

          section {
            display: flex;
            flex-wrap: wrap;
            gap: var(--root-padding);
          }

          category-card {
            width: calc((100% - var(--root-padding)) / 2)
          }

          .button {
            height: 40px;
            display: flex;
            color: inherit;
            margin: 30px 0;
            align-items: center;
            border-radius: 15px;
            text-decoration: none;
            justify-content: center;
            background-color: #d8d8d8;

          }
        `
    }

    render() {
        return html`
            <section>${categories.map(src => html`
                <category-card src="${src}"></category-card>`)}
            </section>
            <a href="" class="button">Посмотреть все категории</a>
        `
    }
}

customElements.define('categories-list', CategoriesList)
