import { Router } from 'express'
import ping from './ping'
import login from './login'
import loginTerminal from './loginTerminal'

const router = Router()

router.use('/ping', ping)
router.use('/login', login)
router.use('/loginTerminal', loginTerminal)

export default router
