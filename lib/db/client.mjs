import 'core-js/actual/structured-clone.js'

export default class DB {

    constructor(options = {}, cache = globalThis.cache) {
        this.options = Object.assign({apiURL: '/api/db'}, options)
        this.methodsQuery = {find: {chain: 'toArray'}, findOne: {}, aggregate: {chain: 'toArray'}}
        this.cache = cache instanceof Map ? cache : new Map(typeof cache == 'object' ? Object.entries(cache) : undefined)
        this.requests = new Map()
    }

    call(method, query = {}, collection = this.options.collection) {
        if (!collection) throw 'Collection not set';
        const args = [method, query, collection],
            key = this.getRequestCacheKey(...args);
        if (this.cache.has(key)) return structuredClone(this.cache.get(key));
        if (this.requests.has(key)) return this.requests.get(key);
        const request = this.request(...args).then(result => {
            this.requests.delete(key)
            return this.saveRequestCache(result, ...args)
        });
        this.requests.set(key, request);
        return request;
    }

    async request(method, query = {}, collection = this.options.collection) {
        const path = `${this.options.apiURL}/${collection}/${method}`
        const url = new URL(new URL(path, location)).toString()
        const request = await fetch(url, {body: JSON.stringify(query), method: 'POST'})
        let result = await request.clone().text()
        try {
            result = await request.clone().json()
        } catch (e) {
            throw {...e, result};
        }
        return result
    }

    getRequestCacheKey(method, query = {}, collection = this.options.collection) {
        return JSON.stringify({collection, method, query})
    }

    getCachedRequest(...args) {
        const key = this.getRequestCacheKey(...args)
        if (this.cache.has(key)) return structuredClone(this.cache.get(key))
    }

    saveRequestCache(result, ...args) {
        if (result) {
            this.cache.set(this.getRequestCacheKey(...args), result)
        }
        return structuredClone(result)
    }

    attachMethods() {
        Object.entries(this.methodsQuery).forEach(([method, query]) =>
            this[method] = (...args) => this.call(method, {...query, args}), this)
    }

    collection(collection = this.options.collection) {
        const targetCollection = Object.assign(Object.create(this), {options: {...this.options, collection}});
        targetCollection.attachMethods();
        return targetCollection;
    }

}

export const db = new DB()
