import { GraphQLNonNull, GraphQLString } from 'graphql'
import {
  mutationWithClientMutationId,
} from 'graphql-relay'
import * as db from '../../database'
import { GraphQLNord } from './index'
import { createUser } from 'server/stores/user'

export const GraphQLAddNord = mutationWithClientMutationId({
  name: 'AddNord',
  inputFields: {
    ugla_id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    nord: {
      type: GraphQLNord,
      resolve: () => db.getViewer(),
    },
  },
  mutateAndGetPayload: ({ ugla_id, name }) => {
    const localUserId = createUser(name, ugla_id)
    return { localUserId }
  },
})

// export const GraphQLRemoveTodoMutation = mutationWithClientMutationId({
//   name: 'RemoveTodo',
//   inputFields: {
//     id: { type: new GraphQLNonNull(GraphQLID) },
//   },
//   outputFields: {
//     deletedTodoId: {
//       type: GraphQLID,
//       resolve: ({ id }) => id,
//     },
//     viewer: {
//       type: GraphQLUser,
//       resolve: () => db.getViewer(),
//     },
//   },
//   mutateAndGetPayload: ({ id }) => {
//     const localTodoId = fromGlobalId(id).id
//     db.removeTodo(localTodoId)
//     return { id }
//   },
// })
