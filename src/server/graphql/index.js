import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import { schema } from 'server/graphql/schema'
import cookie from 'cookie'

export default convert(graphqlHTTP(request => {
  const { session } = cookie.parse(request.header.cookie)

  return {
    schema,
    pretty: true,
    rootValue: { session },
    graphiql: true,
  }
}))
