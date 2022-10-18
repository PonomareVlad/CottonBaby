import {db} from "#db";
import {all, chain, isClient} from "#utils";

if (isClient && !window.catalog) window.catalog = {}

export default class Catalog {
    constructor(host) {
        (this.host = host).addController(this)
    }

    fetchCategories(filter = {}, options = {}) {
        return chain(db.collection('categories').find(filter, options),
            data => Array.isArray(data) ? cache('categories', data) : [])
    }

    fetchCategoriesWithProducts({cFilter = {}, cOptions = {}, pFilter = {}, pOptions = {}} = {}) {
        const products = this.fetchProducts(pFilter, pOptions),
            categories = chain(this.fetchCategories(cFilter, cOptions), categories =>
                Object.fromEntries(categories.map(category => [category.id, Object.assign(category, {products: []})])))
        return chain(all([categories, products]), ([categories, products]) =>
            (products.forEach(product => categories[product.category] ? categories[product.category].products.push(product) : null), categories))
    }

    fetchCategoryByID(id) {
        if (!id) return {}
        return fetchCache('categories', id) ||
            chain(db.collection('categories').findOne({id}), data => cacheOne('categories', data || {}))
    }

    fetchProducts(filter = {}, options = {}) {
        return chain(db.collection('products').find(filter, options),
            data => Array.isArray(data) ? cache('products', data) : [])
    }

    fetchProductByID(id) {
        if (!id) return {}
        return fetchCache('products', id) ||
            chain(db.collection('products').findOne({id}), data => cacheOne('products', data || {}))
    }

    fetchProductsByID(products = []) {
        if (!products.length) return products;
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

function fetchCache(type, id) {
    return isClient ? window?.catalog?.[type]?.[id] : undefined;
}

function cache(type, items = []) {
    if (isClient && typeof type === "string" && type.length && Array.isArray(items)) {
        const targetCache = window.catalog[type] ||= {};
        items.forEach(product => product?.id ? (targetCache[product.id] = product) : null);
    }
    return items;
}

function cacheOne(type, item = {}) {
    cache(type, [item]);
    return item;
}
