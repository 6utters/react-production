describe('Article list interactions', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles')
    })
  })
  it('should load articles', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })
  it('should work with mock', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })
})
