import jwt from 'jsonwebtoken'
import { getUserByUglaId } from 'server/stores/user'

export default async function login(ctx) {
  const { username, password } = ctx.request.body

  const user = await getUserByUglaId(username)

  const token = jwt.sign(user, 'shhhhh', {
    expiresIn: '7d',
  })

  ctx.body = { user }
  ctx.cookies.set('session', token)
}
