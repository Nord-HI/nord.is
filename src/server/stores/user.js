import { pgp, initDb } from './pg'
const db = initDb()

export const createUser = () =>
  db.any(
    `SELECT "register_person"('name', 'ugla_user')`
  )
  .then(() => pgp.end())
  .then(() => 'ok')
  .catch((err) => console.error(err))
