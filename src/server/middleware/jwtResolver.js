import jwt from 'jsonwebtoken'

const jwtResolver = opts => (ctx, next) => {
  /* If we have cookies and the session cookie is present,
     then very the jwt and resolve it to a user object.
     This is needed because not all requests have sessions cookies. */
  if (ctx.cookie && ctx.cookie[opts.cookie]) {
    const userSession = jwt.verify(ctx.cookie[opts.cookie], opts.secret)
    ctx.state.user = userSession
    ctx.state.isAuthenticated = true
  }
  return next()
}

export default jwtResolver
