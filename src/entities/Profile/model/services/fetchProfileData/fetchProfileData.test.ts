import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { fetchProfileData } from './fetchProfileData'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'lastname',
  firstname: 'firstname',
  city: 'Kiev',
  currency: Currency.USD,
  avatar: ''
}

describe('fetchProfileData', () => {
  test('successful', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ data }))
    const result = await thunk.callThunk()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
  })
})
