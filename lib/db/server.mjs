import {ArrayFromJSON, defaultTypes, fetchType, fetchTypes} from "#utils"
import {MongoClient, ObjectId} from "mongodb"
import ClientDB from './client.mjs'

export const mongo = await MongoClient.connect(process.env.MONGODB).catch(e => console.error(e))

export default class DB extends ClientDB {

    constructor(...args) {
        super(...args);
        if (mongo?.db) this.db = mongo.db(process.env.DB)
    }

    async request(method, query = {}, collectionId = this.options.collection) {
        if (!this?.db?.collection) throw 'No connection to DB'
        const collection = this.db.collection(collectionId)
        if (!collection[method]) throw Error('Method not available')
        const args = ArrayFromJSON(query.args).map(arg => fetchTypes(arg))
        const result = await collection[method].apply(collection, args)
        return this.convertData(query.chain ?
            await ArrayFromJSON(query.chain).reduce(async (obj, method) => await obj[method](), result) : result)
    }

    convertData(data) {
        if (!data) return data;
        if (Array.isArray(data)) return data.map(item => this.convertData(item))
        return typeof data == 'object' ? Object.fromEntries(Object.entries(data).map(([key, value]) =>
            [key, this.convertValue(value)])) : this.convertValue(data)
    }

    convertValue(value) {
        return value instanceof ObjectId ? value.toString() : value
    }

    exportCache() {
        return JSON.stringify(this.cache || {},
            (key, value) => value instanceof Map ? Object.fromEntries(value) : value)
    }

}

export const db = new DB()
