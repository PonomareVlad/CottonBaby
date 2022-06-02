import {css, html, LitElement} from "lit"

export class ProductHero extends LitElement {
    static get properties() {
        return {src: {type: String}, title: {type: String}, description: {type: String}}
    }

    static get styles() {
        return css`
          * {
            box-sizing: border-box;
          }

          :host {
            font-family: var(--font-family);
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
          }

          img.background {
            position: absolute;
            object-fit: cover;
            display: block;
            width: 100%;
            height: 100%;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .overlay {
            --backdrop-filter: blur(15px);
            height: auto;
            border-radius: 25px;
            margin-bottom: 80px;
            padding: var(--root-padding);
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-left);
            backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, 0.7);
            -webkit-backdrop-filter: var(--backdrop-filter);
            width: calc(100% - (var(--root-padding-left) * 2));
          }

          .overlay:after {
            --backdrop-filter: blur(10px);
            content: 'Листайте, чтобы смотреть еще';
            box-sizing: border-box;
            padding-right: 18px;
            position: absolute;
            line-height: 30px;
            display: block;
            width: auto;
            left: 50%;
            min-width: 285px;
            text-align: center;
            border-radius: 100px;
            background-size: 8px;
            bottom: var(--root-padding);
            background-repeat: no-repeat;
            transform: translate(-50%, 0);
            background-position: center right 10px;
            backdrop-filter: var(--backdrop-filter);
            background-color: rgba(255, 255, 255, 0.7);
            -webkit-backdrop-filter: var(--backdrop-filter);
            background-image: url("/assets/images/arrow.svg");
            max-width: calc(100% - var(--root-padding-left) - var(--root-padding-right));
          }

          @media (min-width: 350px) {
            .overlay {
              font-size: 18px;
            }

            .overlay:after {
              font-size: 18px;
              min-width: 320px;
              background-size: 8px;
            }
          }

          .overlay :first-child {
            margin-top: 0;
          }

          .overlay :last-child {
            margin-bottom: 0;
          }

          .title {
            font-size: 22px;
            font-weight: bold;
          }

        `
    }

    render() {
        return html`
            <div>
                <div class="overlay">
                    <h3 class="title">${this.title || 'Название продукта'}</h3>
                    ${this.description ? html`<p>${this.description}</p>` : null}
                </div>
                <img src="${this.src}" class="background" alt="Cover">
            </div>
        `
    }
}

customElements.define('product-hero', ProductHero)
