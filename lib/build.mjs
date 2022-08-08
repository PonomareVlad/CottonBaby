import {mkdirSync, writeFileSync, cpSync, readdirSync} from "fs"

const rootDir = new URL('../', import.meta.url),
    outputDir = new URL('./.vercel/output/', rootDir),
    configPath = new URL('./config.json', outputDir),
    staticDir = new URL('./static/', outputDir),
    excluded = ['.', 'node_modules', 'api'],
    config = {
        version: 3,
        images: {
            sizes: [128, 1024, 2048],
            minimumCacheTTL: 31536000,
            formats: ["image/webp", "image/avif"],
            domains: ["cottonbaby.ru", "cloudflare-ipfs.com", "static.insales-cdn.com"]
        }
    }

mkdirSync(staticDir, {recursive: true})
writeFileSync(configPath, JSON.stringify(config))

const exclude = path => excluded.every(exclude => !path.startsWith(exclude)),
    options = {recursive: true, filter: path => exclude(path.split('/').pop())}

readdirSync(rootDir).filter(exclude).map(path =>
    cpSync(new URL(`./${path}`, rootDir), new URL(`./${path}`, staticDir), options))

console.info('Build complete 🎉')
process.exit()
