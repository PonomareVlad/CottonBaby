import {css, html, LitElement} from "lit"

export class ImagesSlider extends LitElement {
    static get styles() {
        return css`
          :host {
            display: flex;
            padding-bottom: var(--root-padding);
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
            gap: var(--root-padding);
            overflow-x: scroll;
            will-change: scroll-position;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          :host:after {
            content: '';
            height: 1px;
            display: block;
            min-width: 1px;
            margin-left: -1px;
          }

          ::slotted(img) {
            min-width: calc(100% - (var(--root-padding) * 2));
            scroll-snap-align: center;
            border-radius: 20px;
            object-fit: cover;
            display: block;
            aspect-ratio: 3/2;
          }
        `
    }

    render() {
        return html`
            <slot></slot>`
    }
}

customElements.define('images-slider', ImagesSlider)
