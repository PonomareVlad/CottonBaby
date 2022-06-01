import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'

export class CategoryCard extends LitElement {
    static get properties() {
        return {src: {type: String}, title: {type: String}}
    }

    static get styles() {
        return css`
          :host {
            display: block;
            aspect-ratio: 0.75;
            position: relative;
          }

          .title {
            --backdrop-filter: blur(10px);
            -webkit-backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: var(--backdrop-filter);
            border-radius: var(--root-padding);
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
            min-height: 40px;
            margin: 0;
            bottom: 0;
            right: 0;
            left: 0;
          }

          img.background {
            border-radius: 20px;
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
        `
    }

    render() {
        return html`
            <div>
                <h3 class="title">${this.title || 'Категория'}</h3>
                <img src="${ifDefined(this.src)}" class="background" alt="Category">
            </div>
        `
    }
}

customElements.define('category-card', CategoryCard)
