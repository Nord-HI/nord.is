import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import { schema } from 'server/graphql/schema'

export default convert(graphqlHTTP((request, ctx) => ({
  schema,
  pretty: true,
  graphiql: true,
  context: ctx,
})))
