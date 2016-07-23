import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
import { normalizePathSuffix } from 'server/utils/securityUtils'

const rootFsDir = path.join(__dirname, '../fileSystem')

export default function ls() {
  const router = new Router()

  router.get('ls', async ctx => {
    const directory = normalizePathSuffix(ctx.query.dir || '')
    const directoryPath = path.join(rootFsDir, directory)
    try {
      const filesInDir = fs.readdirSync(directoryPath)
      ctx.body = filesInDir
    } catch (error) {
      // If the directory does not exist, then send relevant response, else rethrow the error
      if (error.code === 'ENOENT') {
        ctx.body = `ls: ${directory}: No such file or directory`
      } else throw error
    }
  })

  return router
}
