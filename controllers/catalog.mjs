import {db} from "#db";
import {all, chain} from "#utils";

export default class Catalog {
    constructor(host) {
        (this.host = host).addController(this)
    }

    fetchCategories(filter = {}) {
        return chain(db.collection('categories').find(filter), data => Array.isArray(data) ? data : [])
    }

    fetchProducts(filter = {}) {
        return chain(db.collection('products').find(filter), data => Array.isArray(data) ? data : [])
    }

    fetchCategoriesWithProducts(categoryFilter = {}, productFilter = {}) {
        const products = this.fetchProducts(productFilter),
            categories = chain(this.fetchCategories(categoryFilter), categories =>
                Object.fromEntries(categories.map(category => [category.id, Object.assign(category, {products: []})])))
        return chain(all([categories, products]), ([categories, products]) =>
            (products.forEach(product => categories[product.category]?categories[product.category].products.push(product):null), categories))
    }

    fetchProductDataByID(id) {
        return chain(db.collection('products').findOne({id}), data => data || {})
    }

}
