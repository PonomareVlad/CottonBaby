import {createRenderThread} from "../lib/page.mjs"
import {errorHandler} from "../lib/errorHandler.mjs"
import {html} from "lit";

import '../components/app-page.mjs'

export default async (req, res) => {
    try {
        const data = {test: `<hr/>`}
        await createRenderThread(req, res, () => html`
            <context-node .data="${data}">
                <app-html key="test"></app-html>
            </context-node>`)
    } catch (e) {
        return errorHandler(e, res)
    }
}
