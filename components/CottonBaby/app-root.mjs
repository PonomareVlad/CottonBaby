import "urlpattern-polyfill"
import {css, html, LitElement} from "lit"
import {SafeUntil} from "svalit/directives.mjs"
import {Router} from '@svalit/router'
import './app-header.mjs'
import './index-page.mjs'

export class AppRoot extends LitElement {
    safeUntil = new SafeUntil(this)
    router = new Router(this, [
        {
            path: '/',
            render: () => html`
                <index-page></index-page>`
        },
        {
            path: '/catalog',
            render: ({category}) => html`
                <br><br><h1>Catalog — ${category}</h1>`
        },
        {
            path: '/catalog/:category',
            render: ({category}) => html`
                <br><br><h1>Catalog — ${category}</h1>`
        },
        {
            path: '/catalog/:category/:product',
            render: ({product}) => html`
                <br><br><h1>Product — ${product}</h1>`
        }
    ], {fallback: {render: () => html`<br><br><h1>404</h1>`}})

    static get properties() {
        return {url: {type: String, reflect: true}}
    }

    static get styles() {
        return css`
          * {
            touch-action: manipulation;
          }

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
        `
    }

    render() {
        this.router.serverPath = new URL(this.url).pathname;
        return html`
            <app-header></app-header>
            <main>${this.safeUntil(this.router.outlet())}</main>
        `
    }
}

customElements.define('app-root', AppRoot)
