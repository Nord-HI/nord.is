import test from 'ava'
import * as dbHelpers from '../helpers'
import { createUser, getUserByUglaId } from '../user'
import { pgp } from '../pg'

test.beforeEach('prepare db', async () => {
  await dbHelpers.dropDb()
  await dbHelpers.createDatabase()
  await dbHelpers.insertDummyData()
})

test.after('cleanup', async () => pgp.end())

test.serial('createUser', async (t) => {
  const expectedUglaId = 'bar1337'
  const actualUser = await createUser('foobar', expectedUglaId)
  t.is(actualUser.ugla_id, expectedUglaId)
})

test.serial('getUserByUglaId', async t => {
  const expectedUglaId = 'krm1337'
  await createUser('foobar', expectedUglaId)
  const actualUser = await getUserByUglaId(expectedUglaId)
  t.is(actualUser.ugla_id, expectedUglaId)
})
