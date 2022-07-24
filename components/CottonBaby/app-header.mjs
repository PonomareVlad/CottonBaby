import {css, html, LitElement} from "lit"
import styles from "#styles"
import "./app-cart.mjs"

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

          .menu.button,
          .close.button {
            --size: 17px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: transparent;
            overflow: hidden;
            font-size: 0;
          }

          .menu.button:before, .menu.button:after,
          .close.button:before, .close.button:after {
            content: '';
            width: var(--size);
            display: block;
            height: 1px;
            margin: 4px;
            background: black;
            border-radius: 0.5px;
          }

          .close.button:before,
          .close.button:after {
            --size: 20px;
            transform: rotate(45deg);
            transform-origin: center;
          }

          .close.button:after {
            width: 1px;
            position: absolute;
            height: var(--size);
          }

          .logo {
            background-image: url("/assets/images/logo.svg");
            background-origin: content-box;
            padding: 10px;
            flex-grow: 1;
          }

          .cart.button {
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

          #cartTitle {
            font-size: 18px;
            line-height: var(--height);
          }

          nav.menu, app-cart {
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

          nav.menu {
            gap: 20px;
            font-size: 34px;
            font-weight: 300;
          }

          nav.menu a {
            color: inherit;
            text-decoration: none;
          }

          [name="state"],
          #menuClose,
          #cartClose,
          #cartTitle,
          nav.menu,
          app-cart {
            display: none;
          }

          #backdrop {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            display: block;
            position: fixed;
            cursor: pointer;
            pointer-events: none;
            will-change: transform;
            transition: opacity .3s ease .1s;
            background-color: rgba(0, 0, 0, 0.3);
          }

          #menuState:checked ~ .controls #menuOpen {
            display: none;
          }

          #menuState:checked ~ .controls #menuClose {
            display: flex;
          }

          #menuState:checked ~ .controls .logo,
          #cartState:checked ~ .controls .logo {
            display: none;
          }

          #menuState:checked ~ .controls #headerSearch {
            display: block;
          }

          #menuState:checked ~ nav.menu {
            display: flex;
          }

          #cartState:checked ~ .controls #cartOpen {
            display: none;
          }

          #cartState:checked ~ .controls #cartClose {
            display: flex;
          }

          #cartState:checked ~ .controls #cartTitle {
            display: revert;
          }

          #cartState:checked ~ app-cart {
            display: revert;
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

            .menu.button, .close.button, app-cart, #cartTitle {
              display: none;
            }

            .logo {
              padding: unset;
              display: block;
              flex-grow: unset;
              min-width: 130px;
              margin-right: var(--root-padding);
            }

            #cartOpen, #cartClose {
              --size: 70px;
              --padding: var(--root-padding);
              -webkit-backdrop-filter: var(--backdrop-filter);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              background-color: rgba(255, 255, 255, var(--backdrop-opacity));
              backdrop-filter: var(--backdrop-filter);
              background-size: 20px;
              bottom: var(--padding);
              right: var(--padding);
              border-radius: 100%;
              height: var(--size);
              width: var(--size);
              position: fixed;
              z-index: 10;
            }

            #cartClose {
              box-shadow: unset;
            }

            nav.menu {
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

            app-cart {
              opacity: 0;
              height: auto;
              display: revert;
              position: fixed;
              border-radius: 35px;
              pointer-events: none;
              will-change: transform;
              right: var(--root-padding);
              bottom: var(--root-padding);
              transition: opacity .3s ease;
              width: calc(1024px - (var(--root-padding) * 2));
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              background-color: rgba(255, 255, 255, var(--backdrop-opacity));
              max-height: calc(100vh - var(--header-height) - var(--root-padding-top) - (var(--root-padding) * 2));
            }

            #cartState:checked ~ app-cart {
              transition: opacity .3s ease .1s !important;
              pointer-events: all;
              opacity: 1;
            }

            #menuState:checked ~ .controls .logo,
            #cartState:checked ~ .controls .logo {
              display: block;
            }

            #cartState:checked ~ .controls #cartTitle {
              display: none;
            }

            #cartState:checked ~ .controls #backdrop {
              transition: opacity .3s ease !important;
              pointer-events: all;
              opacity: 1;
            }
          }

        `]
    }

    get headerState() {
        return this.shadowRoot.querySelector('[name="state"]:checked').value
    }

    setDefaultState() {
        this.shadowRoot.querySelector('#defaultState').checked = true
        this.menuStateHandler()
    }

    menuStateHandler() {
        document.documentElement.dataset.disableScroll = this.headerState
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
        this.setDefaultState();
    }

    firstUpdated() {
        this.addEventListener('click', this.onClick)
        window.addEventListener('popstate', this.setDefaultState.bind(this));
        this.shadowRoot.querySelectorAll('[name="state"]').forEach(state =>
            state.addEventListener('change', this.menuStateHandler.bind(this)))
    }

    render() {
        return html`
            <input id="defaultState" name="state" type="radio" value="false" checked>
            <input id="menuState" name="state" type="radio" value="true">
            <input id="cartState" name="state" type="radio" value="true">
            <div class="controls">
                <label title="Открыть меню" for="menuState" id="menuOpen" class="menu button">Меню</label>
                <label title="Закрыть меню" for="defaultState" id="menuClose" class="close button">Закрыть</label>
                <a title="Перейти на главную страницу" href="/#" class="logo image button">Главная</a>
                <span id="cartTitle">Корзина</span>
                <input placeholder="Поиск по каталогу" id="headerSearch" type="search">
                <label title="Перейти в корзину" for="cartState" id="cartOpen" class="cart image button">Корзина</label>
                <label title="Закрыть корзину" for="defaultState" id="cartClose" class="close button">Закрыть</label>
                <label title="Закрыть" for="defaultState" id="backdrop"></label>
            </div>
            <nav class="menu">
                <a href="/catalog">Каталог</a>
                <a href="/collections">Коллекции</a>
                <a href="/delivery">Доставка</a>
                <a href="/payment">Оплата</a>
                <a href="/wholesale">Оптом</a>
                <a href="/about">О компании</a>
            </nav>
            <app-cart></app-cart>
        `
    }
}

customElements.define('app-header', AppHeader)
