import {
  GraphQLObjectType, GraphQLSchema,
} from 'graphql'

import {
  getViewer,
} from './database'

import { nodeField } from './interfaces'
import * as todoMutations from './entities/Todo/mutations'
import { GraphQLUser } from './entities/User'

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
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
