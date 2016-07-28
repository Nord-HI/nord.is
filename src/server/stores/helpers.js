const pgp = require('pg-promise')(/*options*/)
const fs = require('fs')
const path = require('path')
const db = pgp({
  database: 'nord_db',
  user: 'nord',
  password: 'nord',
})

export const createDatabase = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, '../../../build_support/sql/schema.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
    .then(() => pgp.end())
}

export const insertDummyData = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, '../../../build_support/sql/insertDummyData.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
    .then(() => pgp.end())
}

export const dropDb = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, '../../../build_support/sql/emptydb.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
    .then(() => pgp.end())
}
