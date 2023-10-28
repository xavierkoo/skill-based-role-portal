describe('Source Manager Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('SM-1: should display the login page', () => {
    cy.get('.login').should('exist')
  })

  it('SM-2: should log in as an HR and redirect to the role listings page', () => {
    cy.get('#dropdown').select('Source Manager')
    cy.get('.defaultBtn').click()
  })

  it('SM-3: should only show View Role Applicants and Application Status, Company Logo, and Logout in the navbar', () => {
    cy.get('#dropdown').select('Source Manager')
    cy.get('.defaultBtn').click()
    cy.get('.status').should('exist')
    cy.get('#applicants').should('exist')
    cy.get('#create').should('not.exist')
    cy.get('.logout').should('exist')
    cy.get('.talentNav').should('exist')
  })

  it('SM-4: should direct to view role applicants page when view role applicants button is clicked', () => {
    cy.get('#dropdown').select('Source Manager')
    cy.get('.defaultBtn').click()
    cy.get('#applicants').click()
    cy.get('h2').should('exist').contains('Role Applicants')
  })

  it('SM-5: should logout when logout button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.nav-link.logout').first().click()
    cy.get('.login').should('exist')
  })
})
