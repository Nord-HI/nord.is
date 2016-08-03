import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { GraphQLUser, GraphQLTodo, getTodo, getUser } from './schema'
import { Todo, User } from './database'

export const { nodeInterface, nodeField } = nodeDefinitions(
  // Function which tells GraphQL how to get the `node` of an entity from an id
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    if (type === 'Todo') {
      return getTodo(id)
    } else if (type === 'User') {
      return getUser(id)
    }
    return null
  },
  // Function which tells GraphQL how to transform our store layer models to graphql models
  (obj) => {
    if (obj instanceof Todo) {
      return GraphQLTodo
    } else if (obj instanceof User) {
      return GraphQLUser
    }
    return null
  }
)
