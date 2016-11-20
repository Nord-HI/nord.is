import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import { schema } from 'server/graphql/schema'

export default convert(graphqlHTTP((request, ctx) => {
  const config = {
    schema,
    pretty: true,
    graphiql: true,
    context: ctx,
  }

  if (__DEV__) {
    config.formatError = error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
    })
  }

  return config
}))
