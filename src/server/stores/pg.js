require('dotenv').config({
  path: '/custom/path/to/your/env/vars',
})

export const pgp = require('pg-promise')(/*options*/)

export const initDb = () => pgp({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
})
