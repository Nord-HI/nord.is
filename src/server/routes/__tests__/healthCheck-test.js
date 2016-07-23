import test from 'ava'
import request from 'supertest-koa-agent'

import app from '../../server'

let server
test.before(async () => {
  server = app()
})

test('healthy should 200', async (t) => {
  const res = await request(server).get('/healthy')
  t.is(res.status, 200)
})
