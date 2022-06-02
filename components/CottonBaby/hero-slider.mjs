import {css, html, LitElement} from "lit"

export class HeroSlider extends LitElement {
    static get styles() {
        return css`
          :host {
            height: 100%;
            display: block;
          }

          slot {
            height: 100%;
            display: flex;
            overflow-x: auto;
            will-change: scroll-position;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          slot:after {
            content: '';
            height: 1px;
            display: block;
            min-width: 1px;
            margin-left: -1px;
          }

          ::slotted(*) {
            min-width: 100%;
            scroll-snap-align: center;
          }
        `
    }

    render() {
        return html`
            <slot></slot>`
    }
}

customElements.define('hero-slider', HeroSlider)
