import test from 'ava'
import * as dbHelpers from '../helpers'
import { createUser } from '../user'

test.before(async () => {
  await dbHelpers.dropDb()
  await dbHelpers.createDatabase()
  await dbHelpers.insertDummyData()
})

test('createUser should work', async (t) => {
  const expected = 'ok'
  const result = await createUser()
  t.is(result, expected)
})
