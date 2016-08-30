import { db } from './pg'
const fs = require('fs')
const path = require('path')

export const createDatabase = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, '../../../build_support/sql/schema.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}

export const insertDummyData = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, '../../../build_support/sql/insertDummyData.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}

export const dropDb = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, '../../../build_support/sql/emptydb.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}
