describe('Source Manager Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should display the login page', () => {
    cy.get('.login').should('exist')
  })

  it('should log in as an HR and redirect to the role listings page', () => {
    cy.get('#dropdown').select('Source Manager')
    cy.get('.defaultBtn').click()
  })

  it('should only show View Role Applicants and Application Status in the navbar', () => {
    cy.get('#dropdown').select('Source Manager')
    cy.get('.defaultBtn').click()
    cy.get('.status').should('exist')
    cy.get('.applicants').should('exist')
    cy.get('.create').should('not.exist')
  })
})
