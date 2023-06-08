import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import avatar from 'shared/assets/tests/storybook.png'
import { profileActions, profileReducer } from './profileSlice'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { ProfileSchema, ValidateProfileError } from '../types/EditableProfileCardSchema'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'lastname',
  firstname: 'firstname',
  city: 'Kiev',
  currency: Currency.USD,
  avatar
}

describe('profileSlice', () => {
  test('should set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false }
    expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true)
    )).toEqual({ readonly: true })
  })

  test('should cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }

    expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
    )).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data
    })
  })

  test('should update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } }
    expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({ username: '123456' })
    )).toEqual({
      form: { username: '123456' }
    })
  })

  test('should update profile | pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] }
    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
    )).toEqual({
      isLoading: true,
      validateErrors: undefined
    })
  })

  test('should update profile | fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true }
    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, '')
    )).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      form: data,
      data
    })
  })
})
