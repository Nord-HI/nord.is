const pgp = require('pg-promise')(/*options*/)
const db = pgp({
  database: 'nord_db',
  user: 'nord',
  password: 'nord',
})

export const createUser = () =>
  db.any(
    'insert into person(given_name, family_name, about) values (${givenName}, ${familyName}, ${about})',
    { givenName: 'Kristo', familyName: 'Tryggvi', about: 'lorem ipsum about' }
  )
  .then(() => pgp.end())
  .then(() => 'ok')
  .catch((err) => console.error(err))
