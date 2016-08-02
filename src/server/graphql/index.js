import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import { schema } from 'server/graphql/schema'

export default convert(graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}))
