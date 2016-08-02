import startServer from './server'
import config from './config'
import startWebpackDevServer from './startWebpackDevServer'

global.c = console

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
