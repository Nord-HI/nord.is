import Router from 'koa-router'


export default function healthCheck() {
  const router = new Router()
  router.get('/ping', async ctx => {
    ctx.body = { message: 'pong' }
  })
  return router
}
