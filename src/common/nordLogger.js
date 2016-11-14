import debug from 'debug'

export const error = debug('app:error')
export const log = debug('app:log')
export const info = debug('app:info')

log.log = console.log.bind(console) // eslint-disable-line no-console
info.log = console.info.bind(console) // eslint-disable-line no-console
