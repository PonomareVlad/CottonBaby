import {db} from "#db";
import {chain} from "#utils";

export default class Catalog {
    constructor(host) {
        (this.host = host).addController(this)
    }

    fetchProductDataByID(id) {
        return chain(db.collection('products').findOne({id}), data => data || {})
    }

}
