import 'dotenv/config'
import {mongo} from "#db"
import {argv} from '#utils'
import {JSDOM} from "jsdom"

const db = mongo.db(process.env.DB),
    categories = db.collection('categories'),
    file = argv('file') || '../.templates/62337.xml',
    filter = ({textContent}) => textContent.toLowerCase().trim() !== 'каталог'

if (!file) console.error('Please specify file path by argument --file=...') || process.exit(0)

const dom = await JSDOM.fromFile(file, {}),
    nodes = [...dom.window.document.querySelectorAll('category')],
    items = nodes.filter(filter).map(({id, textContent: title}) => ({id, title}))

console.info('Target items:', items.length)

let counter = 0;

for await (const item of items) {
    item.id = parseInt(item.id) || null;
    const {id, ...category} = item;
    await categories.findOneAndUpdate({id}, {$set: category}, {upsert: true})
    console.info(++counter, item)
}

await mongo.close()
