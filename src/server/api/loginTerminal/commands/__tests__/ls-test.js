import request from 'supertest-koa-agent'
import app from '../../../../server'

describe('ls command', () => {
  it('should show the root directory if no directory is provided', async () => {
    const expected = ['README.md', 'help.txt', 'hjalp.txt', 'secrets']
    const res = await request(app()).get('/api/loginTerminal/ls')
    expect(res.body).toEqual(expected)
  })
  it('should list files from a given directory', async () => {
    const expected = ['SECRET1.txt']
    const res = await request(app()).get('/api/loginTerminal/ls?dir=secrets')
    expect(res.body).toEqual(expected)
  })
})
