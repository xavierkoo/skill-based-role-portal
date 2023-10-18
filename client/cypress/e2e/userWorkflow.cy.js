describe('User Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  //TODO: add Login tests

  //TODO: update any new UI Elements
  it('should display role listings on the page', () => {
    // Check if the container with class 'container-fluid' exists
    cy.get('.container-fluid').should('exist')

    // Assuming there should be at least one job role item
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('should filter roles by skill successfully', () => {
    // Assuming there's a dropdown with class 'form-select' and options available
    cy.get('select.form-select').select('Python Programming')
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('should display all relevant details in a job role item', () => {
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().should('exist')
    cy.get('.card-title').should('exist') // role name
    cy.get('.fw-bold.badge.rounded-pill').should('exist') // skill match percentage
    cy.get('.badge.rounded-pill.bg-light.text-dark').should('exist') // skills
    cy.get('.card-text').should('exist') // description
    cy.get('.text-muted').should('exist').contains('days left') // days left
  })

  it('should display expanded role details when a role header is clicked', () => {
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.card-text').should('exist')
  })

  it('should display all relevant elements in the expanded role details', () => {
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.roleDetails').should('exist')
    cy.get('.my-auto').should('exist') // role name
    cy.get('.updateBtn').should('exist') // update button
    cy.get('.fw-bold').should('exist').contains('Posted On:') // posted on label
    cy.get('.check').should('exist') // posted on date and deadline
    cy.get('.fw-bold.isPosted').should('exist') // posted by or updated by label
    cy.get('.check.isCreated').should('exist') // posted by or updated by name
    cy.get('.fw-bold').should('exist').contains('Deadline:') // deadline label
    cy.get('.skills-container').should('exist') // skills container
    cy.get('.artdeco-button__text').should('exist').contains('Apply') // apply button
    cy.get('.description').should('exist') // description
  })

  it('should open the application modal when apply button is clicked', () => {
    cy.get('.job-role-item').first().click()
    cy.get('button[data-bs-target="#applicationModal"]').click()
    cy.get('#applicationModal').should('exist')
  })

  it('should display all relevant elements in the application modal', () => {
    cy.get('.job-role-item').first().click()
    cy.get('button[data-bs-target="#applicationModal"]').click()
    cy.get('#application')
      .should('exist')
      .contains(/Role Listing ID: \d+/) // role listing id dynamic id
    cy.get('#roleName').should('have.value', 'Agile Coach (SM)')
    cy.get('.form-label').should('exist').contains('Why do you want this role? (Max 100 words)')
    cy.get('.form-control').should('exist')
    cy.get('.modal-footer').should('exist').contains('Submit')
  })

  it('should close the application modal when back button is clicked', () => {
    cy.get('.job-role-item').first().click()
    cy.get('button[data-bs-target="#applicationModal"]').click()
    cy.wait(500) // wait for modal to open
    cy.get('button[aria-label="Close"]').click()
    cy.get('label[roleName]').should('not.exist')
  })

  it('should be able to submit an application', () => {
    cy.get('.job-role-item').first().click()
    cy.get('button[data-bs-target="#applicationModal"]').click()
    cy.get('#answer').type('Hire Me!')
    cy.get('.modal-footer').contains('Submit').click()
    cy.get('h3').contains('Application Successfully Submitted')
  })

  it('should be able to navigate to the application status page', () => {
    cy.get('.nav-link').contains('Application Status').click()
  })

  it('should display all relevant elements in the application status page', () => {
    cy.get('.nav-link').contains('Application Status').click()
    cy.get('.table').should('exist')
  })

  it('should contain the application made in the application modal', () => {
    cy.get('.nav-link').contains('Application Status').click()
    cy.get('.table').contains('Hire Me!')
  })
})
