let profileId = ' '

describe('Profile page interactions', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit(`/profile/${profileId}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('should successfully load profile page and data', () => {
    cy.getByTestId('ProfileCard.Firstname').should('have.value', 'Test User')
  })
  it('should be able to edit profile', () => {
    const newName = 'new name'
    const newLastname = 'lastname'
    cy.updateProfile(newName, newLastname)
    cy.getByTestId('ProfileCard.Firstname').should('have.value', newName)
    cy.getByTestId('ProfileCard.Lastname').should('have.value', newLastname)
  })
})
