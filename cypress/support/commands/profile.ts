import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click()
  cy.getByTestId('ProfileCard.Firstname').clear().type(firstname)
  cy.getByTestId('ProfileCard.Lastname').clear().type(lastname)
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'Authorization' },
    body: {
      id: '4',
      firstname: 'Test User',
      lastname: 'Test User',
      age: 42,
      currency: 'USD',
      country: 'Russia',
      city: 'Moscow',
      username: 'testUser',
      avatar: 'https://images.hindustantimes.com/tech/img/2023/01/26/960x540/'
          + '_b9c9f4a2-7cd1-11ea-b578-8bb50559d90e_1674714194736_1674714194736.jpg'
    }
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
    return body
  })
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
