import { selectByTestId } from '../helpers/selectByTestId'

describe('Routing', () => {
  describe('Authorized user', () => {
    it('should go to main page', () => {
      cy.visit('/')
      cy.get(selectByTestId('MainPage')).should('exist')
    })
    it('should be redirected from profile page', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId('MainPage')).should('exist')
    })
    it("should be redirected from the page that doesn't exist", () => {
      cy.visit('/random')
      cy.get(selectByTestId('NotFoundPage')).should('exist')
    })
  })
  describe('Unauthorized user', () => {
    beforeEach(() => {
      cy.login()
    })
    it('should go to profile page', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId('ProfilePage')).should('exist')
    })
    it('should go to articles page', () => {
      cy.visit('/articles')
      cy.get(selectByTestId('ArticlesPage')).should('exist')
    })
  })
})
