export function NoUserFoundError() {
  this.message = 'No user found with that name'
  this.status = 401
}

NoUserFoundError.prototype = new Error()
