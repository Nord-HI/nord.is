import app from './server'
import config from './config'

global.c = console

const server = app(config)
server.listen(
  config.PORT,
  () => c.log(`Nord server listening at http://localhost:${config.PORT}`)
)
