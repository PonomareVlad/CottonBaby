import {render} from "@lit-labs/ssr/lib/render-with-global-dom-shim.js"
import {readableFrom} from "@lit-labs/ssr/lib/readable.js"
import {dumpTemplates} from "#lib/template.mjs"
import EventEmitter from "events"
import {readFileSync} from "fs"
import {html} from "lit"
// import {db} from "#db"

// import '../components/app-page.mjs'

const readFile = path => readFileSync(new URL(path, import.meta.url))

const head = readFile('../includes/head.html')
const footer = readFile('../includes/footer.html')
const importMap = `<script type="importmap">${readFile('../includes/importmap.json')}</script>`
const titleTemplate = (title = 'Page') => `<title>${title}</title>`
const liveReload = () => process.env.VERCEL_ENV === 'development' ? `<script src="/lib/livereload.mjs"></script>` : ''
const headTemplate = title => `<!doctype html><html lang="ru"><head>${head}${importMap}${titleTemplate(title)}</head><body>`
const dbCache = () => this?.db?.exportCache ? `<script>window.cache=${db.exportCache()}</script>` : ''
const footerTemplate = page => `${dumpTemplates()}${liveReload()}<script>window.page=${JSON.stringify(page)}</script>${dbCache()}${footer}</body></html>`

const pageTemplate = ({url, setMeta}) => html`
    <app-page url="${url}" .setMeta="${setMeta}"></app-page>`

export async function createRenderThread(req, res, template = pageTemplate, title) {
    const page = {url: `${req.headers['x-forwarded-proto'].split(',').shift()}://${req.headers['x-forwarded-host']}${req.url}`};
    const defaultTitle = title
    const chunks = [];
    const renderEvents = new EventEmitter();
    // const url = `${req.headers['x-forwarded-proto'].split(',').shift()}://${req.headers['x-forwarded-host']}${req.url}`

    renderEvents.once('meta', ({title = defaultTitle, status}) => {
        chunks.unshift(Buffer.from(headTemplate(title)))
        if (status) page.status = status;
        if (title) page.title = title;
    })

    globalThis.renderInfo = {
        customElementHostStack: [],
        customElementInstanceStack: []
    }

    const setMeta = data => renderEvents.emit('meta', data || {});

    const stream = readableFrom(render(template({url: page.url, setMeta}), globalThis.renderInfo), true)

    stream.on('end', () => {
        if (page.status) res.status(page.status)
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Disposition', 'inline');
        renderEvents.emit('meta', {})
        res.write(Buffer.concat(chunks))
        res.end(footerTemplate(page))
    })

    for await (let chunk of stream) chunks.push(Buffer.from(chunk))
}
