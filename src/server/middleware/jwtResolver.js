import jwt from 'jsonwebtoken'

const jwtResolver = opts => (ctx, next) => {
  const userSession = jwt.verify(ctx.cookie[opts.cookie], opts.secret)
  ctx.state.user = userSession
  ctx.state.isAuthenticated = true
  return next()
}

export default jwtResolver
