import {css, html, LitElement} from "lit"

export class AppHero extends LitElement {
    static get styles() {
        return css`
          * {
            box-sizing: border-box;
          }

          :host {
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
            padding-left: var(--root-padding-left);
            padding-right: var(--root-padding-right);
            height: 100%;
            width: 100%;
          }

          .overlay:after {
            display: none;
            content: 'Листайте, чтобы смотреть еще';
            position: absolute;
            bottom: 0;
          }

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
