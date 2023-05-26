import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginPassword } from './getLoginPassword'

describe('getLoginPassword', () => {
  test('should return password', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: 'password'
      }
    }
    expect(getLoginPassword(state as StateSchema)).toEqual('password')
  })
  test('should return empty string if state is empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginPassword(state as StateSchema)).toEqual('')
  })
})
