import Router from 'koa-router'

import ls from './commands/ls'
import cat from './commands/cat'

export default function loginTerminal() {
  const router = new Router({ prefix: '/loginTerminal' })
  router
    .use(ls().routes())
    .use(cat().routes())

  return router
}
