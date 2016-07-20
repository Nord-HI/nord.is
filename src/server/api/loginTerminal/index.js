import { Router } from 'express'
import ls from './commands/ls'
import cat from './commands/cat'

const router = Router()

router.use('/ls', ls)
router.use('/cat', cat)

export default router
