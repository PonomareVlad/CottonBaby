import {css, html, LitElement} from "lit"
import styles from "#styles"

export class ProductHero extends LitElement {
    static get properties() {
        return {src: {type: String}, title: {type: String}, description: {type: String}}
    }

    static get styles() {
        return [styles, css`
          :host {
            font-family: var(--font-family);
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
          }

          .background {
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
          }

          .overlay {
            height: auto;
            border-radius: 25px;
            padding: var(--root-padding);
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-left);
            backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, var(--backdrop-opacity));
            -webkit-backdrop-filter: var(--backdrop-filter);
            width: calc(100% - (var(--root-padding-left) * 2));
            margin-bottom: calc((var(--root-padding-bottom) * 2) + 30px);
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
            font-size: 22px;
            font-weight: bold;
          }

          @media (min-width: 1024px) {
            :host {
              align-items: flex-start;
            }

            .overlay {
              box-sizing: border-box;
              margin-bottom: var(--root-padding-bottom);
              margin-left: var(--root-padding-left);
              font-size: 24px;
              max-width: 35%;
              padding: 25px;
            }

            .title {
              font-size: 32px;
            }
          }
        `]
    }

    render() {
        return html`
            <slot>
                <div class="overlay">
                    <h3 class="title">${this.title || 'Название продукта'}</h3>
                    ${this.description ? html`<p>${this.description}</p>` : null}
                </div>
                <app-image src="${this.src}" class="background" alt="Cover"></app-image>
            </slot>
        `
    }
}

customElements.define('product-hero', ProductHero)
