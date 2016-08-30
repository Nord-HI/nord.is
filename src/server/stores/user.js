import { db } from './pg'

export const createUser = () =>
  db.any(
    `SELECT "register_person"('name', 'ugla_user')`
  )
  .then(() => 'ok')
  .catch((err) => console.error(err))
