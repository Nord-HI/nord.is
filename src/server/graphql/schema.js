import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { getViewer } from './database'
import { GraphQLUser } from './entities/User'
import { GraphQLNord } from './entities/Nord'
import { nodeField } from './interfaces'
import * as todoMutations from './entities/Todo/mutations'
import * as nordMutations from './entities/Nord/mutations'
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
      resolve: (parentValue, args, ctx) => {
        console.log('ctx', ctx.state.user)
        return getUserByUglaId(args.id)
      },
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
    addNord: nordMutations.GraphQLAddNord,
  },
})

export const schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
})
