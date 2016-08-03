import startServer from './server'
import config from './config'

// Start HTTP server
const server = startServer(config)
server.listen(
  config.PORT,
  () => c.log(`Nord server listening at http://localhost:${config.PORT}`)
)
