import fs from 'fs'
import path from 'path'
import { schema } from '../src/server/graphql/schema'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'
// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await (graphql(schema, introspectionQuery))
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    )
  } else {
    const pathToFile = path.join(__dirname, '../build/schema.json')
    const fileDescriptor = fs.openSync(pathToFile, 'w')
    fs.closeSync(fileDescriptor)
    fs.writeFileSync(pathToFile, JSON.stringify(result, null, 2))
  }
})()

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../build/schema.graphql'),
  printSchema(schema)
)