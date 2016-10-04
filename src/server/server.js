import Koa from 'koa'
import logger from 'koa-logger'
import path from 'path'
import Router from 'koa-router'
import sendFile from 'koa-sendfile'
import api from './api'
import staticAssets from './api/staticAssets'
import startWebpackDevServer from './startWebpackDevServer'

// Define globals
global.c = console
global.__DEV__ = process.env.NODE_ENV === 'development' // eslint-disable-line no-underscore-dangle


export default () => {
  const app = new Koa()
  const router = new Router()

  // Middleware
  if (__DEV__) {
    app
      .use(logger())
  }

  // Routes
  app
    .use(staticAssets().routes())
    .use(api().routes())
    .use(router.allowedMethods())

  // Finally serve index.html, client handles 404.
  app
    .use(async ctx => {
      if (process.env.NODE_ENV === 'production') {
        await sendFile(ctx, path.resolve(`${__dirname}/../../built/index.html`))
      } else {
        await sendFile(ctx, path.resolve(`${__dirname}/../../index.html`))
      }
      if (!ctx.status) ctx.throw(404)
    })

  return app
}

// Start Webpack dev server if we are in development mode
if (process.env.NODE_ENV === 'development') {
  startWebpackDevServer(5000)
}
