import "urlpattern-polyfill"
import {css, html, LitElement} from "lit"
import {SafeUntil} from "svalit/directives.mjs"
import {Router} from '@svalit/router'
import styles from "#styles"
import './app-header.mjs'
import './index-page.mjs'
import './catalog-page.mjs'
import './product-page.mjs'

export class AppRoot extends LitElement {
    safeUntil = new SafeUntil(this)
    router = new Router(this, [
        {
            path: '/',
            render: () => html`
                <index-page .setMeta="${this.setMeta}"></index-page>`
        },
        {
            path: '/catalog',
            render: ({category}) => html`
                <catalog-page category="${category}" .setMeta="${this.setMeta}"></catalog-page>`
        },
        {
            path: '/catalog/:category',
            render: ({category}) => html`
                <catalog-page category="${category}" .setMeta="${this.setMeta}"></catalog-page>`
        },
        {
            path: '/catalog/:category/:product',
            render: ({product}) => html`
                <product-page product="${product}" .setMeta="${this.setMeta}"></product-page>`
        }
    ], {
        fallback: {
            render: () => {
                this.setMeta({title: '404'})
                return html`<h1>404</h1>`
            }
        }
    })

    static get properties() {
        return {url: {type: String, reflect: true}}
    }

    static get styles() {
        return [styles, css`
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

          main {
            height: 100%;
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
          }
        `]
    }

    setMeta({title = 'Cotton Baby'} = {}) {
        if (typeof process === 'object') return;
        history.replaceState(history.state, title)
        document.title = title
    }

    render() {
        attachStateProxy()
        if (window.scrollTo) window.scrollTo(0, 0)
        this.router.serverPath = new URL(this.url).pathname;
        return html`
            <app-header></app-header>
            <main>${this.safeUntil(this.router.outlet())}</main>
        `
    }
}

export function attachStateProxy() {
    return window.state = new Proxy(window.history && window.history.state ? window.history.state : {}, {
        set(target, property, value) {
            target[property] = value;
            if (!window.history.replaceState) return true;
            window.history.replaceState(target, document.title);
            return true
        }
    })
}

customElements.define('app-root', AppRoot)
