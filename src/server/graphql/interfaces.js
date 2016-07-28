import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { GraphQLUser, GraphQLTodo, getTodo, getUser } from './schema'
import { Todo, User } from './database'

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    if (type === 'Todo') {
      return getTodo(id)
    } else if (type === 'User') {
      return getUser(id)
    }
    return null
  },
  (obj) => {
    if (obj instanceof Todo) {
      return GraphQLTodo // eslint-disable-line no-use-before-define
    } else if (obj instanceof User) {
      return GraphQLUser // eslint-disable-line no-use-before-define
    }
    return null
  }
)
