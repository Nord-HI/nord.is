import jwt from 'jsonwebtoken'
import { getUserByUglaId } from 'server/stores/user'

export default async function login(ctx) {
  const { username, password } = ctx.request.body

  const user = await getUserByUglaId(username)

  const token = jwt.sign({
    username,
    password,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, 'shhhhh')

  ctx.body = { user }
  ctx.cookies.set('session', token)
}
