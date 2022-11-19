import "urlpattern-polyfill"
import {isClient, isSSR, scheduleTask} from "#utils"
import {css, html, LitElement} from "lit"
import {cache} from "lit/directives/cache.js"
import {safeUntil as serverUntil} from "#utils";
import {ifDefined} from 'lit/directives/if-defined.js'
import {Router} from '@svalit/router'
import styles from "#styles"
import './checkout-page.mjs'
import './catalog-page.mjs'
import './product-page.mjs'
import './app-header.mjs'
import './index-page.mjs'
import './order-page.mjs'

export class AppRoot extends LitElement {
    pages = {
        index: () => html`
            <index-page .setMeta="${this.setMeta}"></index-page>`,
        catalog: ({category} = {}) => html`
            <catalog-page category="${ifDefined(category)}" .setMeta="${this.setMeta}"
                          variant="${ifDefined(this.getSearch('variant'))}"
                          sort="${ifDefined(this.getSearch('sort'))}"></catalog-page>`,
        product: ({product} = {}) => html`
            <product-page product="${ifDefined(product)}" .setMeta="${this.setMeta}"></product-page>`,
        checkout: () => html`
            <checkout-page .setMeta="${this.setMeta}"></checkout-page>`,
        order: ({order} = {}) => html`
            <order-page order="${ifDefined(order)}" .setMeta="${this.setMeta}"></order-page>`
    }
    router = new Router(this, [
        {path: '/', render: this.pages.index},
        {path: '/catalog', render: this.pages.catalog},
        {path: '/catalog/:category', render: this.pages.catalog},
        {path: '/catalog/:category/:product', render: this.pages.product},
        {path: '/product/:product', render: this.pages.product},
        {path: '/order/:order', render: this.pages.order},
        {path: '/checkout', render: this.pages.checkout},
    ], {
        fallback: {
            render: () => {
                this.setMeta({title: '404', status: 404})
                return html`
                    <section class="header-padding root-padding"><h1>Страница не найдена</h1></section>`
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

          @supports (height: 100dvh) {
            :host {
              --dynamic-viewport-height: 100dvh;
            }
          }

          :host {
            --root-padding: 20px;
            --root-padding-top: max(var(--safe-padding-top), var(--root-padding));
            --root-padding-left: max(var(--safe-padding-left), var(--root-padding));
            --root-padding-right: max(var(--safe-padding-right), var(--root-padding));
            --root-padding-bottom: max(var(--safe-padding-bottom), var(--root-padding));
            --viewport-height: var(--dynamic-viewport-height, 100vh);
            --backdrop-filter: blur(25px) saturate(3);
            --backdrop-opacity: 0.8;
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

    getSearch(parameter) {
        return this.location.searchParams.get(parameter)
    }

    setMeta({title = 'Cotton Baby'} = {}) {
        if (isSSR) return;
        history.replaceState(history.state, title)
        document.title = title
    }

    firstUpdated() {
        scheduleTask(() => {
            if (isClient) globalThis.router = this.router;
        })
    }

    render() {
        attachStateProxy()
        if (isClient && location) this.url = location.href
        if (window.scrollTo && this.hasUpdated) window.scrollTo(0, 0)
        this.location = new URL(this.url)
        this.router.serverPath = this.location.pathname
        return html`
            <app-header></app-header>
            <main>${cache(serverUntil(this.router.outlet()))}</main>
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
