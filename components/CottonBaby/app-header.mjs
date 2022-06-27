import {css, html, LitElement} from "lit"

export class AppHeader extends LitElement {
    static get styles() {
        return css`
          * {
            box-sizing: border-box;
          }

          :host {
            --height: 50px;
            --padding: var(--safe-padding-left, 0);
            max-width: 100%;
            height: var(--height);
            box-sizing: border-box;
            justify-content: space-between;
            background: white;
            display: flex;
            padding-left: var(--padding);
            padding-right: var(--padding);
          }

          :host:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: solid 1px rgba(203, 203, 203, 0.5);
          }

          .button {
            width: var(--height);
            height: 100%;
            display: block;
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

          .menu {
            --backdrop-filter: blur(10px);
            flex-grow: 1;
            display: none;
            font-size: 34px;
            font-weight: 300;
            align-items: center;
            justify-content: space-evenly;
            border-radius: var(--header-height);
            backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, 0.7);
            -webkit-backdrop-filter: var(--backdrop-filter);
          }

          .menu a {
            color: inherit;
            text-decoration: none;
          }

          @media (min-width: 1024px) {
            :host {
              background: unset;
              padding: 0 var(--root-padding);
            }

            :host:after {
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
              display: flex;
            }
          }

        `
    }

    render() {
        return html`
            <a class="menu-toggle button" href="#" title="Открыть меню">Меню</a>
            <a class="logo image button" href="/#" title="Перейти на главную страницу">Главная</a>
            <a class="cart image button" href="#" title="Перейти в корзину">Корзина</a>
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
