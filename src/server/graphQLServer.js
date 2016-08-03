import graphQLHTTP from 'koa-graphql'
import convert from 'koa-convert'
import Koa from 'koa'
import { schema } from './graphql/schema'

export default () => {
// Expose a GraphQL endpoint
  const graphQLServer = new Koa()

  graphQLServer.use(convert(graphQLHTTP({
    schema,
    pretty: __DEV__,
    graphiql: __DEV__,
  })))

  return graphQLServer
}
