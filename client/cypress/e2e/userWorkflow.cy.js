describe('User Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should display the login page', () => {
    cy.get('.login').should('exist')
  })

  it('should display all relevant elements in the login page', () => {
    cy.get('.login').should('exist')
    cy.get('.talent').should('exist')
    cy.get('.title').should('exist').contains('Discover The Perfect Role:')
    cy.get('.followup')
      .should('exist')
      .contains('Finding the Ideal Fit for Your Talents and Aspirations')
    cy.get('.form-group').should('exist')
    cy.get('.defaultBtn').should('exist').contains('Log In')
  })

  it('should log in as an employee and redirect to the role listings page', () => {
    cy.get('.defaultBtn').click()
    // Check if the container with class 'container-fluid' exists
    cy.get('.container-fluid').should('exist')

    // Assuming there should be at least one job role item
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('should filter roles by skill successfully', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's a dropdown with class 'form-select' and options available
    cy.get('select.form-select').select('Python Programming')
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('should display all relevant details in a job role item', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().should('exist')
    cy.get('.card-title').should('exist') // role name
    cy.get('.fw-bold.badge.rounded-pill').should('exist') // skill match percentage
    cy.get('.badge.rounded-pill.bg-light.text-dark').should('exist') // skills
    cy.get('.card-text').should('exist') // description
    cy.get('.text-muted').should('exist').contains('days left') // days left
  })

  it('should display expanded role details when a role header is clicked', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.card-text').should('exist')
  })

  it('should display all relevant elements in the expanded role details', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.roleDetails').should('exist')
    cy.get('.my-auto').should('exist') // role name
    cy.get('.fw-bold').should('exist').contains('Posted On:') // posted on label
    cy.get('.check').should('exist') // posted on date and deadline
    cy.get('.fw-bold.isPosted').should('exist') // posted by or updated by label
    cy.get('.fw-bold').should('exist').contains('Deadline:') // deadline label
    cy.get('.skills-container').should('exist') // skills container
    cy.get('.artdeco-button__text').should('exist').contains('Applied') // apply button
    cy.get('.description').should('exist') // description
  })

  it('should be able to navigate to the application status page', () => {
    cy.get('.defaultBtn').click()
    cy.get('.nav-link').contains('Application Status').click()
  })

  it('should display all relevant elements in the application status page', () => {
    cy.get('.defaultBtn').click()
    cy.get('.nav-link').contains('Application Status').click()
    cy.get('.table').should('exist')
  })

  it('should contain the applied application', () => {
    cy.get('.defaultBtn').click()
    cy.get('.nav-link').contains('Application Status').click()
    cy.get('.table').should('exist').contains('Agile Coach (SM)')
    cy.get('.table').contains('applied')
  })
})
