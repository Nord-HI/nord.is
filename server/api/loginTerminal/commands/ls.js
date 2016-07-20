import { Router } from 'express'
import path from 'path'
import fs from 'fs'
import { normalizePathSuffix } from '../../../utils/securityUtils'

const router = Router()
const rootFsDir = path.join(__dirname, '../fileSystem')

router.get('/', (req, res) => {
  const directory = normalizePathSuffix(req.query.dir || '')
  const directoryPath = path.join(rootFsDir, directory)
  try {
    const filesInDir = fs.readdirSync(directoryPath)
    res.send(filesInDir)
  } catch (error) {
    // If the directory does not exist, then send relevant response, else rethrow the error
    if (error.code === 'ENOENT') {
      res.send(`ls: ${directory}: No such file or directory`)
    } else throw error
  }
})

export default router
