import {createRef, ref} from "lit/directives/ref.js"
import {css, html, LitElement} from "lit"
import styles from "#styles"
import Cart from "#root/controllers/cart.mjs"
import Catalog from "#root/controllers/catalog.mjs"

export class CheckoutPage extends LitElement {
    form = createRef()
    cart = new Cart(this)
    catalog = new Catalog(this)

    static get properties() {
        return {
            ship: {type: String},
            hydrated: {state: true},
        }
    }

    static get styles() {
        return [styles, css`
          :host {
            height: 100%;
            display: block;
            padding-top: var(--header-height);
          }

          form {
            padding-bottom: var(--root-padding-bottom);
          }

          .ship {

          }

          .details {
            display: none;
            margin-top: 1em;
            margin-left: 2ch;
          }

          #self:checked ~ #self_details, #delivery:checked ~ #delivery_details {
            display: revert;
          }

          @media (min-width: 1024px) {
            :host {
              padding-top: calc(var(--header-height) + var(--root-padding-top));
            }
          }
        `]
    }

    shipChange() {
        this.ship = this.form.value.elements.ship.value
    }

    setFormFields(form, fields = {}) {
        return Object.entries(fields).forEach(([name, value]) =>
            form.appendChild(Object.assign(document.createElement('input'), {name, value, type: 'hidden'})))
    }

    async getFiscalCart() {
        const cart = await this.cart.getItems()
        const products = await this.catalog.fetchProductsByID(Object.keys(cart))
        const getQuantity = id => Object.values(cart[id]).reduce((a, b) => a + b, 0)
        return products.map(({id, price, title: name, quantity = getQuantity(id)} = {}) =>
            ({name, price, tax: 'none', quantity, sum: quantity * price}))
    }

    async createOrder(e) {
        e.preventDefault();
        const form = this.form.value

        if (!form.reportValidity()) return;

        const cart = this.cart.getItems(),
            fiscalCart = await this.getFiscalCart(),
            sum = await this.catalog.getProductsSum(cart),
            order = {
                sum,
                cart,
                delivery: {},
                ship: form.ship.value,
                name: form.name.value,
                phone: form.client_phone.value,
                email: form.client_email.value
            }

        if (form?.code?.value) order.delivery.code = form.code.value
        if (form?.city?.value) order.delivery.city = form.city.value
        if (form?.comments?.value) order.comments = form.comments.value
        if (form?.street?.value) order.delivery.street = form.street.value
        if (form?.company?.value) order.delivery.company = form.company.value
        if (form?.building?.value) order.delivery.building = form.building.value
        if (form?.apartment?.value) order.delivery.apartment = form.apartment.value

        const result = await fetch('/api/order', {method: 'post', body: JSON.stringify(order)})
            .then(r => r.json())

        if (!result.insertedId) return alert('Не удалось создать заказ')

        const orderid = result.insertedId

        this.setFormFields(form, {
            sum,
            orderid,
            lang: 'ru',
            cart: fiscalCart,
            service_name: `Оплата заказа ID: ${orderid}`,
            user_result_callback: `${new URL(`/order/${orderid}`, location.href)}`
        })

        this.cart.saveItems();

        form.submit();
    }

    firstUpdated() {
        this.hydrated = true;
    }

    render() {
        return html`
            <h1 class="root-padding">Оформление заказа</h1>
            ${this.hydrated && Object.values(this.cart.getItems()).length ? html`
                <form class="root-padding" method="POST" action="https://test-cotton-baby.server.paykeeper.ru/create/"
                      @submit="${this.createOrder}" ${ref(this.form)}>
                    <h2>1. Способ получения заказа</h2>
                    <input type="radio" id="self" value="self" name="ship" required checked
                           @change="${this.shipChange}">
                    <label for="self">Самовывоз</label>
                    <div class="details" id="self_details">г. Екатеринбург, ТРЦ Радуга-Парк, ул. Репина, д. 94</div>
                    <br>
                    <br>
                    <input type="radio" id="delivery" value="delivery" name="ship" required
                           @change="${this.shipChange}">
                    <label for="delivery">Доставка</label>
                    <div class="details" id="delivery_details">
                        ${this.ship === 'delivery' ?
                                html`<input type="radio" id="sdek" value="sdek" name="company" checked required>
                                <label for="sdek">СДЭК</label><br>
                                <input type="radio" id="post" value="post" name="company" required>
                                <label for="post">Почта россии</label>
                                <br>
                                <br>
                                <label for="city">Населенный пункт:</label><br>
                                <input type="text" name="city" placeholder="Москва" required><br><br>
                                <label for="street">Улица:</label><br>
                                <input type="text" name="street" placeholder="Ленина" required><br><br>
                                <label for="building">Номер дома:</label><br>
                                <input type="text" name="building" placeholder="123" required><br><br>
                                <label for="apartment">Квартира/офис:</label><br>
                                <input type="number" name="apartment" placeholder="123" required><br><br>
                                <label for="code">Индекс:</label><br>
                                <input type="number" name="code" placeholder="123456">` : ''}
                    </div>
                    <br>
                    <br>
                    <hr>
                    <h2>2. Информация о покупателе</h2>
                    <label for="phone">Контактный телефон:</label><br>
                    <input type="tel" placeholder="8 999 99 99 999" name="client_phone" id="phone" required><br><br>
                    <label for="email">Email:</label><br>
                    <input type="email" placeholder="mail@mail.ru" name="client_email" id="email" required><br><br>
                    <label for="name">Контактное лицо:</label><br>
                    <input type="text" placeholder="ФИО" name="name" id="name" required><br><br>
                    <label for="comments">Комментарии к заказу:</label><br>
                    <textarea name="comments" id="comments" rows="5"></textarea><br><br>
                    <br>
                    <br>
                    <hr>
                    <h2>3. Оплата</h2>
                    <input type="radio" id="online" value="online" name="payment" checked required>
                    <label for="self">Онлайн на сайте (Visa, MasterCard, Maestro, МИР)</label>
                    <br>
                    <br>
                    <button>Оплатить</button>
                </form>` : html`
                <p class="root-padding">Для оформления заказа необходимо добавить товары в корзину</p>`}`
    }
}

customElements.define('checkout-page', CheckoutPage)
