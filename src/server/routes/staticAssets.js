import Router from 'koa-router'
import sendFile from 'koa-sendfile'
import path from 'path'

export default function staticAssets() {
  const router = new Router()

  router.get('/style.css', async ctx => {
    if (process.env.PRODUCTION) {
      sendFile(ctx, path.resolve(`${__dirname}/../../build/style.css`))
    } else {
      ctx.status = 301
      ctx.redirect('//localhost:9090/build/style.css')
    }
  })

  router.get('/app.js', async ctx => {
    if (process.env.PRODUCTION) {
      sendFile(ctx, path.resolve(`${__dirname}/../../build/app.js`))
    } else {
      ctx.status = 301
      ctx.redirect('//localhost:9090/build/app.js')
    }
  })

  return router
}
