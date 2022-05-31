import {css, html, LitElement} from "lit"

export class AppHeader extends LitElement {
    static get styles() {
        return css`
          * {
            box-sizing: border-box;
          }

          :host {
            --height: 50px;
            height: var(--height);
            justify-content: space-between;
            background: white;
            display: flex;
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
            <div class="menu-toggle button"></div>
            <div class="logo image button"></div>
            <div class="cart image button"></div>
        `
    }
}

customElements.define('app-header', AppHeader)
