import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'

export class CategoryCard extends LitElement {
    static get properties() {
        return {src: {type: String}, title: {type: String}}
    }

    static get styles() {
        return css`
          :host {
            --border-radius: 20px;
            display: block;
            aspect-ratio: 0.75;
            position: relative;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          div {
            width: 100%;
            height: 100%;
          }

          .title {
            -webkit-backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, var(--backdrop-opacity));
            backdrop-filter: var(--backdrop-filter);
            border-radius: var(--border-radius);
            justify-content: center;
            display: inline-flex;
            align-items: center;
            font-weight: normal;
            font-size: inherit;
            position: absolute;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            min-height: calc(var(--border-radius) * 2);
            margin: 0;
            bottom: 0;
            right: 0;
            left: 0;
          }

          img.background {
            border-radius: var(--border-radius);
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

          @media (min-width: 1024px) {
            :host {
              --border-radius: 40px;
            }

            .title {
              font-size: 30px;
            }
          }
        `
    }

    render() {
        return html`
            <a href="/catalog/category">
                <div>
                    <h3 class="title">${this.title || 'Категория'}</h3>
                    <img src="${ifDefined(this.src)}" class="background" alt="Category">
                </div>
            </a>
        `
    }
}

customElements.define('category-card', CategoryCard)
