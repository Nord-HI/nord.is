import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../interfaces'

export const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: {
      type: GraphQLString,
      resolve: (obj) => obj.text,
    },
    complete: {
      type: GraphQLBoolean,
      resolve: (obj) => obj.complete,
    },
  },
  interfaces: [nodeInterface],
})

export const {
  connectionType: TodosConnection,
  edgeType: GraphQLTodoEdge,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: GraphQLTodo,
})
