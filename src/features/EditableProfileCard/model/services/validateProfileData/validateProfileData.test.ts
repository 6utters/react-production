import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import avatar from 'shared/assets/tests/storybook.png'
import { validateProfileData } from './validateProfileData'
import { ValidateProfileError } from '../../types/EditableProfileCardSchema'

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

describe('validateProfileData', () => {
  test('successful', async () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test('without firstname and lastname', async () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA
    ])
  })

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE
    ])
  })

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY
    ])
  })

  test('with empty profile form', async () => {
    const result = validateProfileData({})

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.INCORRECT_CURRENCY,
      ValidateProfileError.INCORRECT_CITY,
      ValidateProfileError.INCORRECT_AVATAR,
      ValidateProfileError.INCORRECT_USERNAME
    ])
  })
})
