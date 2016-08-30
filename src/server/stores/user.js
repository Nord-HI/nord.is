import { db } from './pg'

export const createUser = (name, ugluId) =>
  db.proc('register_person', [name, ugluId])
    .then(createdUser => createdUser)
    .catch(err => console.error(err))

export const getUserByUglaId = uglaId =>
  db.one(
    'select * from person where ugla_user=$1',
    [uglaId]
  )
  .then(user => user)
  .catch(err => console.error(err))
