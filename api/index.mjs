import {readFileSync} from "fs"
import RenderStream from "@svalit/vercel"
import {errorHandler} from "../lib/errorHandler.mjs"
import {html} from "lit";

import '../components/CottonBaby/app-root.mjs'

const importmap = `<script type="importmap">${readFileSync(new URL('../includes/importmap.json', import.meta.url))}</script>`,
    content = {
        loader: '',
        footer: readFileSync(new URL('../includes/footer.html', import.meta.url)),
        head: readFileSync(new URL('../includes/head.html', import.meta.url)) + importmap,
    }

export default async (req, res) => {
    try {
        const url = `${req.headers['x-forwarded-proto'].split(',').shift()}://${req.headers['x-forwarded-host']}${req.url}`
        const options = {
            req,
            res,
            content,
            shim: false,
            meta: {title: 'Cotton Baby', url},
            importMapOptions: {disableGeneration: true}
        }
        const page = new RenderStream(options)
        return page.renderTemplate(({meta: {url}}) => html`
            <app-root url="${url}"></app-root>`)
    } catch (e) {
        return errorHandler(e, res)
    }
}
