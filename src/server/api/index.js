import Router from 'koa-router'
import graphqlServer from 'server/graphql'
import loginTerminal from './loginTerminal'

export default function api() {
  const router = new Router({ prefix: '/api' })

  router
    .get('/ping', async ctx => { ctx.body = 'pong' })
    .all('/graphql', graphqlServer)
    .use(loginTerminal().routes())

  return router
}
