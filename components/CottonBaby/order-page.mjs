import {css, html, LitElement} from "lit"
import styles from "#styles"
import {syncUntil} from "svalit/directives.mjs";
import {db} from '#db'
import {chain} from "#utils";

export class OrderPage extends LitElement {
    static get properties() {
        return {
            order: {type: String},
        }
    }

    static get styles() {
        return [styles, css`
          :host {
            height: 100%;
            display: block;
            padding-top: var(--header-height);
          }

          @media (min-width: 1024px) {
            :host {
              padding-top: calc(var(--header-height) + var(--root-padding-top));
            }
          }
        `]
    }

    fetchOrder(_id = this.order) {
        return db.collection('orders').findOne({_id})
    }

    render() {
        const order = this.fetchOrder(this.order)
        return html`<h1 class="root-padding">Информация о заказе</h1>
        <div class="root-padding">
            <p>ID: ${this.order}</p>
            <p>Сумма: ${syncUntil(chain(order, ({sum} = {}) => sum))}</p>
            <p>Статус: ${syncUntil(chain(order, ({paid} = {}) => paid ? 'Оплачен' : 'Не оплачен'))}</p>
        </div>
        `
    }
}

customElements.define('order-page', OrderPage)
