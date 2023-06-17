let currentArticleId = ''

describe('Page details interactions', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      currentArticleId = article.id
      cy.visit(`articles/${currentArticleId}`)
    })
  })
  afterEach(() => {
    cy.removeArticle(currentArticleId)
  })
  it.skip('should see the content of the article', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
  })
  it.skip('should see a recommendations list', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist')
  })
  it.skip('should be able to comment the article', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment('text')
    cy.getByTestId('CommentCard.Content').should('have.length', 1)
  })
  it('should be able to rate the article', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' })
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRate(5, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 5)
  })
})
