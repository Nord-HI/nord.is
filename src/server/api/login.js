import jwt from 'jsonwebtoken'
import { getUserByUglaId } from 'server/stores/user'

export default async function login(ctx) {
  const { username, password } = ctx.query
  const user = getUserByUglaId(username)
  console.log(user)
  const token = jwt.sign({
    username,
    password,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, 'shhhhh')

  ctx.body = token
}
