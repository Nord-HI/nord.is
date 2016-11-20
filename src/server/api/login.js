import jwt from 'jsonwebtoken'
import { getUserByUglaId } from 'server/stores/user'
import pgp from 'pg-promise'

export default async function login(ctx) {
  const { username, password } = ctx.request.body

  try {
    /* TODO: Do LDAP HI server hit with password to
       ensure the user typed ir the right password */
    const user = await getUserByUglaId(username)

    const token = jwt.sign(user, 'shhhhh', {
      expiresIn: '7d',
    })

    ctx.body = { user, isAuthenticated: true }
    ctx.cookies.set('session', token)
  } catch (err) {
    if (err instanceof pgp.errors.QueryResultError) {
      ctx.status = 401
      ctx.body = {
        message: 'No user found with that id',
        userId: username,
      }
    }
  }
}
