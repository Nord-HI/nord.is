import test from 'ava'
import request from 'supertest-koa-agent'
import app from '../../../../server'
import { arraysEqual } from '../../../../utils/testUtils'

let server

test.before(async () => {
  server = app()
})

test('ls command: should show the root directory if no directory is provided', async (t) => {
  const expected = ['README.md', 'secrets']
  const res = await request(server).get('/api/loginTerminal/ls')
  t.true(arraysEqual(res.body, expected))
})

test('ls command: should list files from a given directory', async (t) => {
  const expected = ['SECRET1.txt']
  const res = await request(server).get('/api/loginTerminal/ls?dir=secrets')
  t.true(arraysEqual(res.body, expected))
})
