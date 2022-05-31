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
            display: flex;
            flex-wrap: wrap;
            gap: var(--root-padding);
            margin: var(--root-padding) 0;
          }

          category-card {
            width: calc((100% - var(--root-padding)) / 2)
          }
        `
    }

    render() {
        return categories.map(src => html`
            <category-card src="${src}"></category-card>`)
    }
}

customElements.define('categories-list', CategoriesList)
