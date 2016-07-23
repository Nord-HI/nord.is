import test from 'ava'
import request from 'supertest-koa-agent'
import app from '../../../../server'

let server

test.before(async () => {
  server = app()
})

test('cat command: should return a error message if given file does not exist', async (t) => {
  const expected = 'cat: non_existing.txt: No such file or directory'
  const res = await request(server).get('/api/loginTerminal/cat?file=non_existing.txt')
  t.is(res.text, expected)
})

test('cat command: should return the contents of a given file in utf8 encoding', async (t) => {
  const expected = 'secret 1\n'
  const res = await request(server).get('/api/loginTerminal/cat?file=secrets/SECRET1.txt')
  t.is(res.text, expected)
})
