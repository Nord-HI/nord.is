const pgp = require('pg-promise')(/*options*/)
const db = pgp({
  database: 'nord_db',
  user: 'nord',
  password: 'nord',
})

export const createUser = () =>
  db.any(
    `SELECT "register_person"('name', 'ugla_user')`
  )
  .then(() => pgp.end())
  .then(() => 'ok')
  .catch((err) => console.error(err))
