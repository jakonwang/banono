import fs from 'node:fs/promises'
import path from 'node:path'

const SPA_ENTRY = 'index.html'
const STATIC_FILE_PATTERN = /\.[a-z0-9]+$/i
const RESERVED_PREFIXES = ['/admin', '/api', '/uploads', '/content-manager', '/content-type-builder', '/i18n']

const shouldServeFrontendEntry = (urlPath: string) => {
  if (!urlPath || urlPath === '/') return true
  if (STATIC_FILE_PATTERN.test(urlPath)) return false
  return !RESERVED_PREFIXES.some((prefix) => urlPath === prefix || urlPath.startsWith(`${prefix}/`))
}

export default () => {
  return async (ctx: any, next: () => Promise<void>) => {
    if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
      await next()
      return
    }

    if (!shouldServeFrontendEntry(ctx.path)) {
      await next()
      return
    }

    const entryPath = path.join(strapi.dirs.static.public, SPA_ENTRY)

    try {
      const html = await fs.readFile(entryPath, 'utf8')
      ctx.type = 'text/html; charset=utf-8'
      ctx.body = ctx.method === 'HEAD' ? '' : html
      return
    } catch {
      await next()
    }
  }
}
