import startServer from './server'
import startGraphQLServer from './graphQLServer'
import config from './config'
import startWebpackDevServer from './startWebpackDevServer'

global.c = console

// Start HTTP server
const server = startServer(config)
server.listen(
  config.PORT,
  () => c.log(`Nord server listening at http://localhost:${config.PORT}`)
)

// Start GraphQL server
const graphQLServer = startGraphQLServer()
graphQLServer.listen(
  config.GRAPHQL_PORT,
  () => c.log(`GraphQL Server is now running on http://localhost:${config.GRAPHQL_PORT}`)
)

// Start Webpack
if (!process.env.PRODUCTION & process.env.NODE_ENV !== 'test') {
  startWebpackDevServer(config.GRAPHQL_PORT)
}
