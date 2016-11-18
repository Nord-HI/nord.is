import Router from 'koa-router'
import graphqlServer from 'server/graphql'
import loginTerminal from './loginTerminal'
import login from './login'

export default function api() {
  const router = new Router({ prefix: '/api' })

  router
    // No idea why jwt middleware breaks /ping
    .get('/ping', async ctx => {
      // console.log('ping', ctx.state.user)
      ctx.body = 'pong'
    })
    .all('/graphql', graphqlServer)
    .post('/login', login)
    .use(loginTerminal().routes())

  return router
}
