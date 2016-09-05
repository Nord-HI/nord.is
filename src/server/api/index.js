import Router from 'koa-router'

import loginTerminal from './loginTerminal'

export default function api() {
  const router = new Router({ prefix: '/api' })

  router
    .get('/ping', async ctx => { ctx.body = 'pong' })
    .use(loginTerminal().routes())

  router
    .post('/login', async ctx => { ctx.body = 'logged in' })
    .use(loginTerminal().routes())

  return router
}
