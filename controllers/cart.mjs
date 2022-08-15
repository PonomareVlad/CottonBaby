export default class Cart {
    constructor(host) {
        (this.host = host).addController(this)
    }

    hostConnected() {
        document.addEventListener('cart', this.onCartChange.bind(this));
    }

    hostDisconnected() {
        document.removeEventListener('cart', this.onCartChange.bind(this));
    }

    onCartChange(e) {
        delete this.data
        return this.host.requestUpdate()
    }

    parseItems() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart'))
            return this.data = typeof cart === 'object' ? cart || {} : {}
        } catch (e) {
            return this.data = {}
        }
    }

    saveItems(items = {}) {
        return localStorage.setItem('cart', JSON.stringify(this.data = items))
    }

    getItems() {
        return this.data || this.parseItems()
    }

    getItemValue(itemId, valueId) {
        const items = this.getItems();
        if (!itemId || !valueId || !items || !items[itemId.toString()] || !items[itemId.toString()][valueId.toString()]) return undefined;
        return items[itemId.toString()][valueId.toString()]
    }

    setItem(id, item = {}) {
        if (!id) throw 'Empty ID';
        const key = id.toString(), items = this.getItems()
        items[key] = Object.assign((typeof items[key] === 'object' ? items[key] || {} : {}), item)
        const data = Object.fromEntries(Object.entries(items).map(([id, item]) =>
            [id, Object.fromEntries(Object.entries(item).filter(([, value]) => value))]).filter(([, item]) => Object.values(item).length))
        this.saveItems(data)
        return document.dispatchEvent(new Event('cart', {bubbles: true, composed: true}))
    }

    getItemsCount() {
        return Object.values(this.getItems()).flatMap(item => Object.values(item)).reduce((a, b) => a + b, 0)
    }

}
