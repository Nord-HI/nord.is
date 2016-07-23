import app from './server'
import config from './config'

const server = app(config)
server.listen(
  config.PORT,
  () => console.log(`Nord server listening at http://localhost:${config.PORT}`)
)
