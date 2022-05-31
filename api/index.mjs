import {createRenderThread} from "../lib/page.mjs"
import {errorHandler} from "../lib/errorHandler.mjs"
import {html} from "lit";

import '../components/CottonBaby/app-root.mjs'

export default async (req, res) => {
    try {
        await createRenderThread(req, res, () => html`
            <app-root></app-root>`, 'Cotton Baby')
    } catch (e) {
        return errorHandler(e, res)
    }
}
