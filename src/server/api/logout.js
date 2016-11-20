export default async function logout(ctx) {
  // Set the session token to a bogus value and make it expired.
  // This will force the browser to invalidate the cookie.
  ctx.cookies.set('session', 'rubbish', {
    expires: new Date(1970, 0, 1), // 1 January 1970
  })

  ctx.body = 'session deleted successfully'
}
