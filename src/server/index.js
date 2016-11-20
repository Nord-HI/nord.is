import startServer from './server'
import config from './config'
import { info } from 'common/nordLogger'

// Start HTTP server
const server = startServer(config)
server.listen(
  config.PORT,
  () => info(`Nord server listening at http://localhost:${config.PORT}`)
)
