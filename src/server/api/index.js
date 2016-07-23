import Router from 'koa-router'

import loginTerminal from './loginTerminal'

export default function api() {
  const router = new Router({ prefix: '/api' })

  router
    .get('/ping', async ctx => { ctx.body = 'pong' })
    .use(loginTerminal().routes())

  return router
}
