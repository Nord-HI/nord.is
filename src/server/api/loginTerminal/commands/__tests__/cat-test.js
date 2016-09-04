import request from 'supertest-koa-agent'
import app from '../../../../server'

describe('cat command', () => {
  it('should return a error message if given file dose not exist', async () => {
    const expected = 'cat: non_existing.txt: No such file or directory'
    const res = await request(app()).get('/api/loginTerminal/cat?file=non_existing.txt')
    expect(res.text).toBe(expected)
  })
  it('should return the contents of a given file in utf8 encoding', async () => {
    const expected = 'secret 1\n'
    const res = await request(app()).get('/api/loginTerminal/cat?file=secrets/SECRET1.txt')
    expect(res.text).toBe(expected)
  })
})
