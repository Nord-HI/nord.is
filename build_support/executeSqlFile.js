require('dotenv').config()
const pgp = require('pg-promise')(/*options*/)
const fs = require('fs')
var argv = require('optimist')
  .usage('Usage: $0 -f [string]')
  .demand('f').alias('f', 'file').describe('f', 'path to sql file')
  .argv

const schemaString = fs.readFileSync(argv.f).toString()

const db = pgp({
  database: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

db.any(schemaString)
  .then(() => console.info('Successfully executed query'))
  .catch((err) => console.error(err))
  .then(() => pgp.end())
