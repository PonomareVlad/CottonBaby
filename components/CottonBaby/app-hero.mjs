import {css, html, LitElement} from "lit"

export class AppHero extends LitElement {
    static get styles() {
        return css`
          * {
            box-sizing: border-box;
          }

          :host {
            font-family: var(--font-family);
            display: block;
            position: relative;
            height: 100%;
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
            padding: var(--root-padding);
            padding-top: calc(var(--root-padding) + var(--header-height));
            padding-right: var(--root-padding-right);
            padding-left: var(--root-padding-left);
            height: 100%;
            width: 100%;
            position: relative;
          }

          /*.overlay:after {
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
          }*/

          .header {
            font-size: 40px;
            font-weight: 300;
            line-height: normal;
            margin: 0;
            margin-bottom: 20px;
          }

          p {
            margin: 20px 0;
            font-size: 24px;
            line-height: normal;
          }

          /*@media (min-width: 350px) {
            .overlay:after {
              font-size: 18px;
              min-width: 320px;
              background-size: 8px;
            }
          }*/

          @media (min-width: 1024px) {
            :host {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .overlay {
              height: auto;
              max-width: 40%;
              padding: unset;
              padding-left: var(--root-padding-left);
            }

            /*.overlay:after {
              content: unset;
            }*/
            .header {
              font-size: 80px;
            }

            p {
              font-size: 34px;
              font-weight: 300;
            }
          }

        `
    }

    render() {
        return html`
            <div class="overlay">
                <h1 class="header">Cotton Baby</h1>
                <p>Магазин десткой одежды собственного производства</p>
            </div>
            <img src="https://cloudflare-ipfs.com/ipfs/bafybeihh7elsjpovblkglgve6b6mvgryljgn7be47xgttelv3crmllh2wq/1.jpg"
                 class="background" alt="Cover">
        `
    }
}

customElements.define('app-hero', AppHero)
