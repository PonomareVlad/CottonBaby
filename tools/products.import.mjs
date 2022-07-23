import 'dotenv/config'
import {mongo} from "#db"
import {argv} from '#utils'
import {readFileSync} from "fs"

const db = mongo.db(process.env.DB),
    products = db.collection('products'),
    categories = db.collection('categories'),
    file = argv('file') || '../.templates/shop_data-16.07.2022.csv',
    productFields = ["id", "sex", "path", "code", "title", "price", "color", "images", "caption", "category", "published", "basePrice", "composition", "description"],
    variantFields = ["size", "count", "variantId"],
    schema = Object.fromEntries(Object.entries({
        id: 'ID товара',
        title: 'Название товара',
        path: 'Название товара в URL',
        url: 'URL',
        caption: 'Краткое описание',
        description: 'Полное описание',
        published: 'Видимость на витрине',
        category: 'Размещение на сайте',
        images: 'Изображения',
        size: 'Свойство: Размер',
        variantId: 'ID варианта',
        code: 'Артикул',
        price: 'Цена продажи',
        basePrice: 'Цена закупки',
        count: 'Остаток',
        composition: 'Параметр: Состав',
        sex: 'Параметр: Пол',
        color: 'Параметр: Цвет'
    }).map(([k, v]) => [v, k]))

if (!file) console.error('Please specify file path by argument --file=...') || process.exit(0)

const data = readFileSync(file.toString(), 'utf16le'),
    rows = data.split('\n').filter(Boolean).map(r => r.split('\t').map(c => c.trim())),
    parsedSchema = rows.shift().reduce((result, value, index) =>
        (schema[value] ? {...result, [schema[value]]: index} : result), {}),
    catalogSegment = segment => segment?.toLowerCase() !== 'каталог',
    isPublished = item => item?.published?.toLowerCase() === 'выставлен',
    parseImages = string => string ? string.trim().split(' ') : [],
    parseCategoryName = string => parseCategorySegments(string)?.filter(catalogSegment)?.shift(),
    parseCategorySegments = string => string?.split(' ## ')?.filter(catalogSegment)?.shift()?.split('/'),
    filterFields = (data, fields) => Object.fromEntries(Object.entries(data).filter(([_]) => fields.includes(_))),
    parseItem = row => Object.fromEntries(Object.entries(parsedSchema).map(([k, i]) => [k, row[i] === '""' ? null : row[i]]));

console.info('Target items:', rows.length)

let counter = 0;
const category = Object.fromEntries((await categories.find().toArray()).map(({id, title}) => [title, id]))

for await (const row of rows) {
    const item = parseItem(row);
    item.published = isPublished(item);
    item.id = parseInt(item.id) || null;
    item.count = parseInt(item.count) || null;
    item.price = parseFloat(item.price) || null;
    item.images = parseImages(item.images) || [];
    item.variantId = parseInt(item.variantId) || null;
    item.basePrice = parseFloat(item.basePrice) || null;
    item.category = category[parseCategoryName(item.category)] || null;

    if (!item.published) continue;

    const {id, ...product} = filterFields(item, productFields);
    await products.findOneAndUpdate({id}, {$set: product}, {upsert: true})
    const variant = filterFields(item, variantFields);

    variant.id = variant.variantId || null;
    variant.title = variant.size || null;
    delete variant.variantId;
    delete variant.size;

    await products.findOneAndUpdate({id}, {$set: {[`variants.${variant.id}`]: variant}}, {upsert: true})

    console.info(++counter, {product: id, variant: variant.id})
}

await mongo.close()
