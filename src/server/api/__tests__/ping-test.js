import request from 'supertest-koa-agent'

import app from '../../server'

test('api/ping should respond with `pong`', async () => {
  const server = app()
  const res = await request(server).get('/api/ping')
  expect(res.text).toBe('pong')
})

test('unimplemented', () => {
  expect(1).toBe(1)
})
