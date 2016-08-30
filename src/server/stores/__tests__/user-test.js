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
  const expectedUgluId = 'bar1337'
  const actualUser = await createUser('foobar', expectedUgluId)
  t.is(actualUser.ugla_user, expectedUgluId)
})

test.serial('getUserByUglaId', async t => {
  const expectedUgluId = 'krm1337'
  await createUser('foobar', expectedUgluId)
  const actualUser = await getUserByUglaId(expectedUgluId)
  t.is(actualUser.ugla_user, expectedUgluId)
})
