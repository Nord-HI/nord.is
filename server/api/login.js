import { Router } from 'express'
const router = Router()

const user = {
  id: 1337,
  name: 'Krixtofer',
  email: 'krm21@hi.is',
}

router.post('/', (req, res) => {
  console.info(req.body)
  res.send('okkkk')
})

export default router
