import startServer from './server'
import config from './config'
import startWebpackDevServer from './startWebpackDevServer'
require('dotenv').config()


global.c = console
global.__DEV__ = process.env.TIRE === 'DEVELOPMENT' // eslint-disable-line no-underscore-dangle

// Start HTTP server
const server = startServer(config)
server.listen(
  config.PORT,
  () => c.log(`Nord server listening at http://localhost:${config.PORT}`)
)

// Start Webpack dev server
if (!process.env.PRODUCTION & process.env.NODE_ENV !== 'test') {
  startWebpackDevServer(config.GRAPHQL_PORT)
}
