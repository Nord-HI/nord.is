import Router from 'koa-router'
import graphqlServer from 'server/graphql'
import loginTerminal from './loginTerminal'
import login from './login'
import logout from './logout'

export default function api() {
  const router = new Router({ prefix: '/api' })

  router
    .get('/healthy', async ctx => { ctx.body = 'ok' })
    .all('/graphql', graphqlServer)
    .post('/login', login)
    .get('/logout', logout)
    .use(loginTerminal().routes())

  return router
}
