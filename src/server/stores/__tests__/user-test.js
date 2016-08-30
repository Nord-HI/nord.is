import test from 'ava'
import * as dbHelpers from '../helpers'
import { createUser } from '../user'
import { pgp } from '../pg'

test.beforeEach('prepare db', async () => {
  await dbHelpers.dropDb()
  await dbHelpers.createDatabase()
  await dbHelpers.insertDummyData()
})

test.after('cleanup', async () => pgp.end())

test('createUser should work', async (t) => {
  const expected = 'ok'
  const result = await createUser()
  t.is(result, expected)
})
