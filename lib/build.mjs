import {mkdirSync, writeFileSync} from "fs"

const outputDir = new URL('../.vercel/output/', import.meta.url),
    config = {
        version: 3,
        images: {
            sizes: [128, 1024, 2048],
            minimumCacheTTL: 31536000,
            formats: ["image/webp", "image/avif"],
            domains: ["cottonbaby.ru", "cloudflare-ipfs.com", "static.insales-cdn.com"]
        }
    }
mkdirSync(outputDir, {recursive: true})
writeFileSync(new URL('./config.json', outputDir), JSON.stringify(config))
console.debug('Config', config)
process.exit()
