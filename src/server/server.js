import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cookieParser from 'koa-cookie'
import Router from 'koa-router'
import jwtResolver from './middleware/jwtResolver'
import api from './api'
import staticAssets from './api/staticAssets'
import startWebpackDevServer from '../../webpack/startWebpackDevServer'
import { renderEjs } from './utils/renderUtils'

// Define globals
global.__DEV__ = process.env.NODE_ENV === 'development' // eslint-disable-line no-underscore-dangle
global.__PROD__ = process.env.NODE_ENV === 'production' // eslint-disable-line no-underscore-dangle

export default () => {
  const app = new Koa()
  const router = new Router()

  // Dev Middlewares
  if (__DEV__) {
    app
      .use(logger())
  }

  // Middlewares
  app
    .use(bodyParser())
    .use(cookieParser())
    .use(jwtResolver({ secret: 'shhhhh', cookie: 'session' }))

  // Routes
  app
    .use(staticAssets().routes())
    .use(api().routes())
    .use(router.allowedMethods())

  // Finally serve index.html, client handles 404.
  app
    .use(async ctx => {
      // TODO: add ctx.response.lastModifies, etag and  length
      // its possible to get it from fs.stat(filePath)
      // See: https://github.com/koajs/sendfile/blob/master/index.js
      if (__PROD__) {
        throw new Error('not implemented yet')
      } else {
        const htmlStr = await renderEjs(
          `${__dirname}/../../index.ejs`,
          { payload: `__NORD_DATA__ = ${JSON.stringify(ctx.state)}` },
        )

        ctx.body = htmlStr
        ctx.type = 'html'
        ctx.status = 200
      }
      if (!ctx.status) ctx.throw(404) // ?
    })

  return app
}

// Start Webpack dev server if we are in development mode
if (__DEV__) {
  startWebpackDevServer(5000)
}
