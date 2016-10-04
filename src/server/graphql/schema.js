import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { getViewer } from './database'
import { GraphQLUser } from './entities/User'
import { GraphQLNord } from './entities/Nord'
import { nodeField } from './interfaces'
import * as todoMutations from './entities/Todo/mutations'
import { getUserByUglaId } from 'server/stores/user'

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    nord: {
      type: GraphQLNord,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (_, { id }) => getUserByUglaId(id),
    },
    node: nodeField,
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: todoMutations.GraphQLAddTodoMutation,
    changeTodoStatus: todoMutations.GraphQLChangeTodoStatusMutation,
    markAllTodos: todoMutations.GraphQLMarkAllTodosMutation,
    removeCompletedTodos: todoMutations.GraphQLRemoveCompletedTodosMutation,
    removeTodo: todoMutations.GraphQLRemoveTodoMutation,
    renameTodo: todoMutations.GraphQLRenameTodoMutation,
  },
})

export const schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
})
