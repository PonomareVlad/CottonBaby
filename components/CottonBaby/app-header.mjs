import {css, html, LitElement} from "lit"
import styles from "#styles"

export class AppHeader extends LitElement {
    static get styles() {
        return [styles, css`
          :host {
            --height: 50px;
            --padding: var(--safe-padding-left, 0);
            display: flex;
            max-width: 100%;
            max-height: 100vh;
            flex-direction: column;
          }

          .controls {
            gap: 5px;
            display: flex;
            position: relative;
            height: var(--height);
            padding-left: var(--padding);
            padding-right: var(--padding);
            justify-content: space-between;
            background: white;
          }

          .controls:after {
            content: '';
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            border-bottom: solid 1px rgba(203, 203, 203, 0.5);
          }

          .button {
            width: var(--height);
            height: 100%;
            display: block;
            cursor: pointer;
          }

          .image {
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            color: transparent;
            overflow: hidden;
          }

          .menu-toggle {
            --size: 17px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: transparent;
            overflow: hidden;
            font-size: 0;
          }

          .menu-toggle:before, .menu-toggle:after {
            content: '';
            width: var(--size);
            display: block;
            height: 1px;
            margin: 4px;
            background: black;
            border-radius: 0.5px;
          }

          .logo {
            background-image: url("/assets/images/logo.svg");
            background-origin: content-box;
            padding: 10px;
            flex-grow: 1;
          }

          .cart {
            background-image: url("/assets/images/cart.svg");
            background-size: 15px;
          }

          #headerSearch {
            -webkit-appearance: none;
            width: 100px;
            border: none;
            margin: unset;
            display: none;
            flex-grow: 1;
            outline: none;
            font-size: 18px;
            padding: 0 10px;
            max-width: 260px;
            min-width: unset;
            line-height: 35px;
            padding-left: 35px;
            align-self: center;
            border-radius: 10px;
            background-size: 13px;
            background-repeat: no-repeat;
            background-position: left 10px center;
            background-color: rgba(120, 120, 128, 0.1);
            background-image: url("/assets/images/search.svg");
          }

          .menu {
            gap: 20px;
            display: none;
            font-size: 34px;
            font-weight: 300;
            overflow-y: auto;
            flex-direction: column;
            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;
            backdrop-filter: var(--backdrop-filter);
            -webkit-backdrop-filter: var(--backdrop-filter);
            height: calc(var(--viewport-height) - var(--height));
            background-color: rgba(255, 255, 255, var(--backdrop-opacity));
            padding: var(--root-padding-top) var(--root-padding-right) var(--root-padding-bottom) var(--root-padding-left);
          }

          .menu a {
            color: inherit;
            text-decoration: none;
          }

          #headerMenuState {
            display: none;
          }

          #headerMenuState:checked ~ .controls .menu-toggle:before,
          #headerMenuState:checked ~ .controls .menu-toggle:after {
            --size: 20px;
            transform: rotate(45deg);
            transform-origin: center;
          }

          #headerMenuState:checked ~ .controls .menu-toggle:after {
            width: 1px;
            position: absolute;
            height: var(--size);
          }

          #headerMenuState:checked ~ .controls .logo {
            display: none;
          }

          #headerMenuState:checked ~ .controls #headerSearch {
            display: block;
          }

          #headerMenuState:checked ~ .menu {
            display: flex;
          }

          @media (min-width: 1024px) {
            :host {
              display: flex;
              background: none;
              max-height: unset;
              flex-direction: row;
              backdrop-filter: unset;
              -webkit-backdrop-filter: unset;
              padding: 0 var(--root-padding);
            }

            .controls {
              display: initial;
              background: none;
            }

            .controls:after {
              content: unset;
            }

            .menu-toggle {
              display: none;
            }

            .logo {
              padding: unset;
              flex-grow: unset;
              min-width: 130px;
              margin-right: var(--root-padding);
            }

            .cart {
              --size: 70px;
              --padding: var(--root-padding);
              --backdrop-filter: blur(25px) saturate(3);
              -webkit-backdrop-filter: var(--backdrop-filter);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              background-color: rgba(255, 255, 255, 0.7);
              backdrop-filter: var(--backdrop-filter);
              background-size: 20px;
              bottom: var(--padding);
              right: var(--padding);
              border-radius: 100%;
              height: var(--size);
              width: var(--size);
              position: fixed;
            }

            .menu {
              gap: unset;
              flex-grow: 1;
              height: auto;
              display: flex;
              padding: unset;
              align-items: center;
              flex-direction: row;
              justify-content: space-evenly;
              border-radius: var(--header-height);
              backdrop-filter: var(--backdrop-filter);
              -webkit-backdrop-filter: var(--backdrop-filter);
              background: rgba(255, 255, 255, var(--backdrop-opacity));
            }
          }

        `]
    }

    set menuState(value) {
        this.shadowRoot.querySelector('#headerMenuState').checked = value
        this.menuStateHandler()
        return true;
    }

    get menuState() {
        return this.shadowRoot.querySelector('#headerMenuState').checked
    }

    menuStateHandler() {
        document.documentElement.dataset.disableScroll = this.menuState
    }

    onClick(e) {
        const isNonNavigationClick = e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey;
        if (e.defaultPrevented || isNonNavigationClick) return;
        const anchor = e.composedPath().find(n => n.tagName === 'A');
        if (
            anchor === undefined ||
            anchor.target !== '' ||
            anchor.hasAttribute('download') ||
            anchor.getAttribute('rel') === 'external'
        ) return;
        const href = anchor.href;
        if (href === '' || href.startsWith('mailto:')) return;
        if (anchor.origin !== (location.origin || location.protocol + '//' + location.host)) return;
        this.menuState = false;
    }

    firstUpdated() {
        this.addEventListener('click', this.onClick)
        window.addEventListener('popstate', () => this.menuState = false);
        this.shadowRoot.querySelector('#headerMenuState').addEventListener('change', this.menuStateHandler.bind(this))
    }

    render() {
        return html`
            <input id="headerMenuState" type="checkbox">
            <div class="controls">
                <label title="Открыть меню" class="menu-toggle button" for="headerMenuState">Меню</label>
                <a class="logo image button" href="/#" title="Перейти на главную страницу">Главная</a>
                <input id="headerSearch" type="search" placeholder="Поиск по каталогу">
                <a class="cart image button" href="#" title="Перейти в корзину">Корзина</a>
            </div>
            <nav class="menu">
                <a href="/catalog">Каталог</a>
                <a href="/collections">Коллекции</a>
                <a href="/delivery">Доставка</a>
                <a href="/payment">Оплата</a>
                <a href="/wholesale">Оптом</a>
                <a href="/about">О компании</a>
            </nav>
        `
    }
}

customElements.define('app-header', AppHeader)
