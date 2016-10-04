import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface } from '../../interfaces'

export const GraphQLNord = new GraphQLObjectType({
  name: 'Nord',
  fields: {
    id: globalIdField(
      'Nord',
      nord => nord.ugla_id,
    ),
    name: {
      type: GraphQLString,
      resolve: nord => nord.name,
    },
    ugla_id: {
      type: GraphQLString,
      resolve: nord => nord.ugla_id,
    },
    created_at: {
      type: GraphQLString,
      resolve: nord => nord.created_at,
    },
  },
  // Lazy evaluate the interfaces due to circular dependency issues
  interfaces: () => [nodeInterface],
})
