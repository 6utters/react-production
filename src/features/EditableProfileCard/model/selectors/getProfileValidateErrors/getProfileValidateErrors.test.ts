import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileValidateErrors } from './getProfileValidateErrors'
import { ValidateProfileError } from '../../types/EditableProfileCardSchema'

describe('getProfileValidateErrors', () => {
  test('should return profile validateErrors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.SERVER_ERROR,
          ValidateProfileError.INCORRECT_AGE
        ]
      }
    }
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.INCORRECT_AGE
    ])
  })
  test('should return undefined if state is empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})