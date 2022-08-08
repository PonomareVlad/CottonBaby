import {css, html, LitElement} from "lit"
import {ifDefined} from 'lit/directives/if-defined.js'
import {ref, createRef} from "lit/directives/ref.js"

export class AppImage extends LitElement {
    img = createRef()

    static get properties() {
        return {
            src: {type: String},
            alt: {type: String},
            cdn: {type: Boolean},
            width: {type: Number},
            quality: {type: Number},
            loading: {type: String},
            decoding: {type: String}
        }
    }

    static get styles() {
        return css`
          :host {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
            position: relative;
            background-size: 30%;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: var(--border-radius);
            background-color: rgba(200, 200, 200, 0.1);
            background-image: url("/assets/images/logo.svg");
          }

          img {
            opacity: 1;
            margin: -1px;
            display: block;
            object-fit: cover;
            position: absolute;
            object-position: center;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            transition: all .3s ease;
            transform: var(--img-transform);
            border-radius: var(--border-radius);
          }

          .loading {
            opacity: 0;
            transition: opacity .3s;
          }

          ::slotted(*) {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
            position: absolute;
          }
        `
    }

    load() {
        if (this.img.value.complete) this.img.value.classList.toggle('loading', false)
    }

    updated() {
        if (!this.img.value.complete) this.img.value.classList.toggle('loading', true)
    }

    getImageURL() {
        if (!this.src || !this.cdn) return this.src;
        const url = this.src
        const w = this.width || 2048
        const q = this.quality || 95
        const cdnURL = new URL('https://cotton-baby-cdn.vercel.app/_vercel/image')
        Object.entries({url, q, w}).forEach(([name, value]) => cdnURL.searchParams.set(name, value))
        return cdnURL.href
    }

    render() {
        return html`
            <slot></slot>
            <picture>
                <img src="${ifDefined(this.getImageURL())}" alt="${ifDefined(this.alt)}" @load="${this.load}"
                     loading="${ifDefined(this.loading)}" decoding="${ifDefined(this.decoding)} ${ref(this.img)}">
            </picture>`
    }
}

customElements.define('app-image', AppImage)
