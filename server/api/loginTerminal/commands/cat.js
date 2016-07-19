import { Router } from 'express'
import path from 'path'
import fs from 'fs'
import { normalizePathSuffix } from '../../../utils/securityUtils'

const router = Router()
const rootFsDir = path.join(__dirname, '../fileSystem')

router.get('/', (req, res) => {
  const file = normalizePathSuffix(req.query.file)
  const filePath = path.join(rootFsDir, file)
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    res.send(fileContents)
  } catch (error) {
    // If the file does not exist, then send relevant response, else rethrow the error
    if (error.code === 'ENOENT') {
      res.send(`cat: ${file}: No such file or directory`)
    } else throw error
  }
})

export default router
