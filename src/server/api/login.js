import { Router } from 'express'
const router = Router()

const user = {
  id: 1337,
  name: 'Krixtofer',
  email: 'krm21@hi.is',
}

router.post('/', (req, res) => {
  res.json(user)
})

export default router
