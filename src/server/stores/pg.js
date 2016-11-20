export const pgp = require('pg-promise')(/*options*/) // eslint-disable-line global-require

export const db = pgp({
  database: process.env.POSTGRES_DB || 'nord_db',
  user: process.env.POSTGRES_USER || 'nord',
  password: process.env.POSTGRES_PASSWORD || 'nord',
  host: process.env.POSTGRES_HOST || 'localhost',
})
