import * as dbHelpers from '../helpers'
import { createUser, getUserByUglaId } from '../user'
import { pgp } from '../pg'

beforeEach(async () => {
  await dbHelpers.dropDb()
  await dbHelpers.createDatabase()
  await dbHelpers.insertDummyData()
})

afterEach(async () => pgp.end())

test('createUser', async () => {
  const expectedUglaId = 'bar1337'
  const actualUser = await createUser('foobar', expectedUglaId)
  expect(actualUser.ugla_id).toBe(expectedUglaId)
})

test('getUserByUglaId', async () => {
  const expectedUglaId = 'krm1337'
  await createUser('foobar', expectedUglaId)
  const actualUser = await getUserByUglaId(expectedUglaId)
  expect(actualUser.ugla_id).toBe(expectedUglaId)
})
