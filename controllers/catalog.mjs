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

    fetchVariants(filter = {}) {
        return chain(this.fetchProducts(filter), products => products.flatMap(({variants} = {}) => Object.values(variants)))
    }

}
