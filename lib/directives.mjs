import {serverUntil} from "@lit-labs/ssr-client/directives/server-until.js";
import {isClient} from "#utils";

export const syncUntil = (p, ...args) => p instanceof Promise ? serverUntil(p, ...args) : p;

export class SafeUntil {
    constructor(host) {
        (this.host = host).addController(this)
        return this.safeUntil.bind(this.host)
    }

    safeUntil(p, ...args) {
        if (p instanceof Promise && isClient && !this.hasUpdated) {
            console.error('Async hydration in', this)
            return syncUntil(undefined, ...args)
        }
        return syncUntil(p, ...args)
    }
}
