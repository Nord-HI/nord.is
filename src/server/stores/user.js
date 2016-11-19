import { db } from './pg'

export class Nord {
  constructor(user) {
    this.name = user.name
    this.ugla_id = user.ugla_id
    this.created_at = user.created_at
  }
}

export const createUser = (name, ugluId) =>
  db.proc('register_person', [name, ugluId])
    .then(createdUser => createdUser)

export const getUserByUglaId = uglaId =>
  db.one(
    'select * from person where ugla_id=$1',
    [uglaId]
  )
  .then(user => new Nord(user))

export const getUsers = () =>
  db.many('select * from person')
    .then(user => user)
