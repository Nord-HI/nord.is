import graphQLHTTP from 'koa-graphql'
import convert from 'koa-convert'
import mount from 'koa-mount'
import Koa from 'koa'
import { schema } from './graphql/schema'

export default () => {
// Expose a GraphQL endpoint
  const graphQLServer = new Koa()

  graphQLServer.use(mount('/', convert(graphQLHTTP({
    schema,
    pretty: true,
    graphiql: true,
  }))))

  return graphQLServer
}
