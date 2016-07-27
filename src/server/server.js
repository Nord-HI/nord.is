import Koa from 'koa'
import logger from 'koa-logger'
import path from 'path'
import Router from 'koa-router'
import sendFile from 'koa-sendfile'
import api from './api'
import staticAssets from './api/staticAssets'

export default () => {
  const app = new Koa()
  const router = new Router()

  // Middleware
  app
    .use(logger())

  // Routes
  app
    .use(staticAssets().routes())
    .use(api().routes())
    .use(router.allowedMethods())

  // Finally serve index.html
  app
    .use(async ctx => {
      await sendFile(ctx, path.resolve(`${__dirname}/../../build/index.html`))
      if (!ctx.status) ctx.throw(404)
    })

  return app
}
