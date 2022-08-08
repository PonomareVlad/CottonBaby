import {readdirSync} from "fs"

const outputDir = new URL('../.vercel/output/', import.meta.url),
    configPath = new URL('./config.json', outputDir),
    config = {
        version: 3,
        images: {
            sizes: [128, 1024, 2048],
            minimumCacheTTL: 31536000,
            formats: ["image/webp", "image/avif"],
            domains: ["cottonbaby.ru", "cloudflare-ipfs.com", "static.insales-cdn.com"]
        }
    }
// mkdirSync(outputDir, {recursive: true})
// writeFileSync(configPath, JSON.stringify(config))
console.debug(new URL('../.vercel', import.meta.url).href, readdirSync(new URL('../.vercel', import.meta.url)))
console.debug(new URL('../../output', import.meta.url).href, readdirSync(new URL('../../output', import.meta.url)))
process.exit()
