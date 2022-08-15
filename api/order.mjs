import {db} from "#db";

export default async ({body}, {json}) =>
    json(await db.db.collection('orders').insertOne(JSON.parse(body)))
