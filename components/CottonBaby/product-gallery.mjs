import {css, html, LitElement} from "lit"
import styles from "#styles"
import './drag-scroll.mjs'

export class ProductGallery extends LitElement {
    static get styles() {
        return [styles, css`
          drag-scroll {
            --gap: 0;
            --padding-left: 0;
            --padding-right: 0
          }

          img {
            object-fit: cover;
            aspect-ratio: 1;
          }

          @media (min-width: 1024px) {
            drag-scroll::part(container) {
              border-radius: 40px;
            }
          }
        `]
    }

    render() {
        return html`
            <drag-scroll>
                <img src="https://cloudflare-ipfs.com/ipfs/bafybeihh7elsjpovblkglgve6b6mvgryljgn7be47xgttelv3crmllh2wq/1.jpg"
                     alt="Image">
                <img src="https://cottonbaby.ru/images/pictures/i4.jpg" alt="Image">
                <img src="https://cottonbaby.ru/images/pictures/i3.jpg" alt="Image">
                <img src="https://cottonbaby.ru/images/pictures/i2.jpg" alt="Image">
                <img src="https://cottonbaby.ru/images/pictures/i1.jpg" alt="Image">
            </drag-scroll>`
    }
}

customElements.define('product-gallery', ProductGallery)
