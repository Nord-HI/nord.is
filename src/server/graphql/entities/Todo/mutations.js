import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql'

import {
  cursorForObjectInConnection, fromGlobalId,
  mutationWithClientMutationId, toGlobalId,
} from 'graphql-relay'

import * as db from '../../database'

import { GraphQLUser } from '../User'
import { GraphQLTodo, GraphQLTodoEdge } from './index'

export const GraphQLRemoveCompletedTodosMutation = mutationWithClientMutationId({
  name: 'RemoveCompletedTodos',
  outputFields: {
    deletedTodoIds: {
      type: new GraphQLList(GraphQLString),
      resolve: ({ deletedTodoIds }) => deletedTodoIds,
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => db.getViewer(),
    },
  },
  mutateAndGetPayload: () => {
    const deletedTodoLocalIds = db.removeCompletedTodos()
    const deletedTodoIds = deletedTodoLocalIds.map(toGlobalId.bind(null, 'Todo'))
    return { deletedTodoIds }
  },
})

export const GraphQLAddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todoEdge: {
      type: GraphQLTodoEdge,
      resolve: ({ localTodoId }) => {
        const todo = db.getTodo(localTodoId)
        return {
          cursor: cursorForObjectInConnection(db.getTodos(), todo),
          node: todo,
        }
      },
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => db.getViewer(),
    },
  },
  mutateAndGetPayload: ({ text }) => {
    const localTodoId = db.addTodo(text)
    return { localTodoId }
  },
})

export const GraphQLChangeTodoStatusMutation = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({ localTodoId }) => db.getTodo(localTodoId),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => db.getViewer(),
    },
  },
  mutateAndGetPayload: ({ id, complete }) => {
    const localTodoId = fromGlobalId(id).id
    db.changeTodoStatus(localTodoId, complete)
    return { localTodoId }
  },
})

export const GraphQLMarkAllTodosMutation = mutationWithClientMutationId({
  name: 'MarkAllTodos',
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  outputFields: {
    changedTodos: {
      type: new GraphQLList(GraphQLTodo),
      resolve: ({ changedTodoLocalIds }) => changedTodoLocalIds.map(db.getTodo),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => db.getViewer(),
    },
  },
  mutateAndGetPayload: ({ complete }) => {
    const changedTodoLocalIds = db.markAllTodos(complete)
    return { changedTodoLocalIds }
  },
})

export const GraphQLRemoveTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedTodoId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => db.getViewer(),
    },
  },
  mutateAndGetPayload: ({ id }) => {
    const localTodoId = fromGlobalId(id).id
    db.removeTodo(localTodoId)
    return { id }
  },
})

export const GraphQLRenameTodoMutation = mutationWithClientMutationId({
  name: 'RenameTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todo: {
      type: GraphQLTodo,
      resolve: ({ localTodoId }) => db.getTodo(localTodoId),
    },
  },
  mutateAndGetPayload: ({ id, text }) => {
    const localTodoId = fromGlobalId(id).id
    db.renameTodo(localTodoId, text)
    return { localTodoId }
  },
})
