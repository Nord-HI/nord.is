import { Router } from 'express'
import ping from './ping'
import login from './login'

const router = Router()

router.use('/ping', ping)
router.use('/login', login)

export default router
