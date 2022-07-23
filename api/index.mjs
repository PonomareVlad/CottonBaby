import {readFileSync} from "fs"
import RenderStream from "@svalit/vercel"
import {errorHandler} from "../lib/errorHandler.mjs"
import {html} from "lit";
import {db} from "#db";

import '../components/CottonBaby/app-root.mjs'

const importmap = `<script type="importmap">${readFileSync(new URL('../includes/importmap.json', import.meta.url))}</script>`,
    liveReload = process.env.VERCEL_ENV === 'development' ? `<script src="/lib/livereload.mjs" noshim></script>` : '',
    content = {
        loader: '',
        footer: readFileSync(new URL('../includes/footer.html', import.meta.url)),
        head: readFileSync(new URL('../includes/head.html', import.meta.url)) + importmap + liveReload,
    };

class RenderPage extends RenderStream {
    footerTemplate(...args) {
        const footer = super.footerTemplate(...args)
        return [
            db?.exportCache ? this.scriptTemplate(`window.cache=${db.exportCache()}`) : '',
            footer
        ].join('\n')
    }
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
        const page = new RenderPage(options)
        return page.renderTemplate(({meta: {url, setMeta}}) => html`
            <app-root url="${url}" .setMeta="${setMeta}"></app-root>`)
    } catch (e) {
        return errorHandler(e, res)
    }
}
