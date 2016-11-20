import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { GraphQLUser } from './entities/User'
import { GraphQLTodo } from './entities/Todo'
import { GraphQLNord } from './entities/Nord'
import * as fakeDb from './database'
import { getUserByUglaId, Nord } from 'server/stores/user'

export const { nodeInterface, nodeField } = nodeDefinitions(
  // Function which tells GraphQL how to get the `node` of an entity from an id
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    if (type === 'Todo') {
      return fakeDb.getTodo(id)
    } else if (type === 'User') {
      return fakeDb.getUser(id)
    } else if (type === 'Nord') {
      return getUserByUglaId(id)
    }
    return null
  },
  // Function which tells GraphQL how to transform our store layer models to graphql models
  (obj) => {
    if (obj instanceof fakeDb.Todo) {
      return GraphQLTodo
    } else if (obj instanceof fakeDb.User) {
      return GraphQLUser
    } else if (obj instanceof Nord) {
      return GraphQLNord
    }
    return null
  }
)
