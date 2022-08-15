import {ObjectId} from "mongodb";
import {db} from "#db";

const orders = db.db.collection('orders')
const products = db.db.collection('products')

export default async ({body}, {json}) => {
    const _id = new ObjectId(body.orderid)
    const order = await orders.findOne({_id})
    if (!order || order.paid) return json({status: true})
    const orderResult = await orders.updateOne({_id}, {$set: {paid: true, payment: body}})
    const productsResult = await Promise.all(Object.entries(order.cart).map(([id, variants]) => {
        const operations = Object.fromEntries(Object.entries(variants).map(([id, count]) => [`variants.${id}.count`, count * -1]))
        console.debug({id, variants, operations})
        return products.updateOne({id: parseInt(id)}, {$inc: operations})
    }))
    console.debug({orderResult, productsResult})
    return json({status: true, orderResult, productsResult})
}
