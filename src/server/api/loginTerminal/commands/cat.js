import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
import { normalizePathSuffix } from 'server/utils/securityUtils'

const rootFsDir = path.join(__dirname, '../fileSystem')

export default function cat() {
  const router = new Router()

  router.get('cat', async ctx => {
    const file = normalizePathSuffix(ctx.query.file)
    const filePath = path.join(rootFsDir, file)
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      ctx.body = fileContents
    } catch (error) {
      // If the file does not exist, then send relevant response, else rethrow the error
      if (error.code === 'ENOENT') {
        ctx.body = `cat: ${file}: No such file or directory`
      } else throw error
    }
  })

  return router
}
