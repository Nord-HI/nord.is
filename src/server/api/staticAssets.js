import Router from 'koa-router'
import sendFile from 'koa-sendfile'
import path from 'path'
import { normalizePathSuffix } from 'server/utils/securityUtils'

export default function staticAssets() {
  const router = new Router()

  router.get('/built/:file', async ctx => {
    if (process.env.NODE_ENV === 'production') {
      // TODO: Set up Cache-Control header, gzip??
      const filePath = path.join(__dirname, '../../../', normalizePathSuffix(ctx.path))
      await sendFile(ctx, filePath)
    } else {
      ctx.status = 301
      ctx.redirect(`//localhost:9090${normalizePathSuffix(ctx.path)}`)
    }
  })

  return router
}
