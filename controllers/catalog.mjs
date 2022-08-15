import {db} from "#db";
import {all, chain} from "#utils";

export default class Catalog {
    constructor(host) {
        (this.host = host).addController(this)
    }

    fetchCategories(filter = {}, options = {}) {
        return chain(db.collection('categories').find(filter, options), data => Array.isArray(data) ? data : [])
    }

    fetchCategoriesWithProducts({cFilter = {}, cOptions = {}, pFilter = {}, pOptions = {}} = {}) {
        const products = this.fetchProducts(pFilter, pOptions),
            categories = chain(this.fetchCategories(cFilter, cOptions), categories =>
                Object.fromEntries(categories.map(category => [category.id, Object.assign(category, {products: []})])))
        return chain(all([categories, products]), ([categories, products]) =>
            (products.forEach(product => categories[product.category] ? categories[product.category].products.push(product) : null), categories))
    }

    fetchCategoryByID(id) {
        return chain(db.collection('categories').findOne({id}), data => data || {})
    }

    fetchProducts(filter = {}, options = {}) {
        return chain(db.collection('products').find(filter, options), data => Array.isArray(data) ? data : [])
    }

    fetchProductByID(id) {
        return chain(db.collection('products').findOne({id}), data => data || {})
    }

    fetchProductsByID(products = []) {
        return all(products.map(id => this.fetchProductByID(id)))
    }

    fetchVariants(filter = {}) {
        return chain(this.fetchProducts(filter), products => products.flatMap(({variants} = {}) => Object.values(variants)))
    }

    getProductsSum(products = {}) {
        return Object.entries(products).map(([id, variants]) =>
            this.getVariantsSum(id, variants)).reduce((a, b) => chain(a, a => chain(b, b => a + b)), 0)
    }

    getVariantsSum(id, cartItem = {}) {
        return chain(this.fetchProductByID(id), ({price}) =>
            parseFloat(price) * Object.values(cartItem).reduce((a, b) => a + b, 0))
    }

}
