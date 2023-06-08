import { screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender/componentRender'
import { Profile } from 'entities/Profile'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import userEvent from '@testing-library/user-event'
import { $api } from 'shared/api/api'
import { profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCard } from './EditableProfileCard'

const profile: Profile = {
  id: '1',
  firstname: 'admin',
  lastname: 'admin',
  age: 111,
  currency: Currency.USD,
  country: Country.Armenia,
  city: 'City',
  username: 'admin123'
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: {
        id: '1',
        username: 'admin'
      }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
}

describe('features/EditableProfileCard', () => {
  test('Should switch edit mode on', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    expect(screen.getByTestId('EditableProfileCardHeader.SaveButton')).toBeInTheDocument()
  })

  test('Should remove changes on cancel', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.Lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

    expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('admin')
  })

  test('Should validate', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'))

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(screen.getAllByTestId('EditableProfileCard.Error.Paragraph')[0]).toBeInTheDocument()
  })

  // test('Should send put request if there is no errors spotted', async () => {
  //   const mockPutReq = jest.spyOn($api, 'put')
  //   componentRender(<EditableProfileCard id="1" />, options)
  //   await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
  //
  //   await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user')
  //
  //   await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))
  //
  //   expect(mockPutReq).toHaveBeenCalled()
  // })
})
