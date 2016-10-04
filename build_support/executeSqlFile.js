require('dotenv').config()
const pgp = require('pg-promise')(/*options*/)
const fs = require('fs')
const argv = require('optimist')
  .usage('Usage: $0 -f [string]')
  .demand('f')
  .alias('f', 'file')
  .describe('f', 'path to sql file')
  .argv

/* Read the file corresponding to the filename which was passed to this script
   with the `-f` command-line flag and converts it to a string */
const schemaString = fs.readFileSync(argv.f).toString()

const db = pgp({
  database: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

/* `db.any` executes a querystring and expectes anything to be returned.
    That is, there are no constraints on what should be returned. */
db.any(schemaString)
  .then(() => console.info('Successfully executed query')) // eslint-disable-line no-console
  .catch((err) => console.error(err))  // eslint-disable-line no-console
  .then(() => pgp.end())
