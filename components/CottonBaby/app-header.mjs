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

          .menu-toggle {
            --size: 17px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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

          .image {
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
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

        `
    }

    render() {
        return html`
            <a class="menu-toggle button" href="#"></a>
            <a class="logo image button" href="#"></a>
            <a class="cart image button" href="#"></a>
        `
    }
}

customElements.define('app-header', AppHeader)
