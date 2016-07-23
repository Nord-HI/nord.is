import test from 'ava'
import request from 'supertest-koa-agent'

import app from '../../server'

let server
test.before(async () => {
  server = app()
})

test('api/ping should respond with `pong`', async (t) => {
  const res = await request(server).get('/api/ping')
  t.is(res.text, 'pong')
})
