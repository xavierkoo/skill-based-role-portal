describe('User Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('User-1: should display the login page', () => {
    cy.get('.login').should('exist')
  })

  it('User-1.1: should not show the navbar in the login page', () => {
    cy.get('.login').should('exist')
    cy.get('.nav-link').should('not.exist')
  })

  it('User-2: should display all relevant elements in the login page', () => {
    cy.get('.login').should('exist')
    cy.get('.talent').should('exist')
    cy.get('.title').should('exist').contains('Discover The Perfect Role:')
    cy.get('.followup')
      .should('exist')
      .contains('Finding the Ideal Fit for Your Talents and Aspirations')
    cy.get('.form-group').should('exist')
    cy.get('.defaultBtn').should('exist').contains('Log In')
  })

  it('User-3: should log in as an employee and redirect to the role listings page displaying a list of available role listings', () => {
    cy.get('.defaultBtn').click()
    // Check if the container with class 'container-fluid' exists
    cy.get('.container-fluid').should('exist')

    // Assuming there should be at least one job role item
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('User-4: should contain the necessary skill filters and filter roles by skill successfully', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's a dropdown with class 'form-select' and options available
    cy.get('select.form-select').should('exist').contains('Python Programming')
    cy.get('select.form-select').should('exist').contains('Pascal Programming')
    cy.get('select.form-select').should('exist').contains('Certified Scrum Master')
    cy.get('select.form-select').should('exist').contains('Certified Scrum Professional')
    cy.get('select.form-select').should('exist').contains('Certified Scrum@Scale Practitioner')
    cy.get('select.form-select').should('exist').contains('Certified Scrum Developer')
    cy.get('select.form-select').should('exist').contains('Certified Scrum Product Owner')
    cy.get('select.form-select').should('exist').contains('Certified Scrum Coach')
    cy.get('select.form-select').should('exist').contains('Certified Scrum Trainer')
    cy.get('select.form-select').select('Python Programming')
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('User-5: should display all relevant details in a job role item', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().should('exist')
    cy.get('.card-title').should('exist') // role name
    cy.get('.fw-bold.badge.rounded-pill').should('exist') // skill match percentage
    cy.get('.badge.rounded-pill.bg-light.text-dark').should('exist') // skills
    cy.get('.card-text').should('exist') // description
    cy.get('.text-muted').should('exist').contains('days left') // days left
  })

  it('User-6: should display expanded role details when a role header is clicked', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.card-text').should('exist')
  })

  it('User-7: should display all relevant elements in the expanded role details', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.roleDetails').should('exist')
    cy.get('#role_name').should('exist') // role name
    cy.get('.fw-bold').should('exist').contains('Posted On:') // posted on label
    cy.get('.check').should('exist') // posted on date and deadline
    cy.get('.fw-bold.isPosted').should('exist') // posted by or updated by label
    cy.get('.fw-bold').should('exist').contains('Deadline:') // deadline label
    cy.get('.skills-container').should('exist') // skills container
    cy.get('.artdeco-button__text').should('exist').contains('Applied') // apply button
    cy.get('.description').should('exist') // description
  })

  it('User-7.1: should display more than one skill for a role that requires more than one skill', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').eq(2).click()
    cy.get('.skills-container').should('exist').contains('Pascal Programming')
    cy.get('.skills-container').should('exist').contains('Certified Scrum@Scale Practitioner')
  })

  it('User-8: should be able to navigate to the application status page', () => {
    cy.get('.defaultBtn').click()
    cy.get('#status').click()
  })

  it('User-9: should display all relevant elements in the application status page', () => {
    cy.get('.defaultBtn').click()
    cy.get('#status').click()
    cy.get('.table').should('exist')
    cy.get('td').should('exist').contains('applied')
  })

  it('User-10: should contain the applied application', () => {
    cy.get('.defaultBtn').click()
    cy.get('#status').click()
    cy.get('.table').should('exist').contains('Agile Coach (SM)')
    cy.get('.table').contains('applied')
  })

  it('User-11: should display the skill match percentage as 0 when the user has no skills', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.text-danger').should('exist').contains('0')
  })

  it('User-12: should display the skill match percentage as 100 when the user has all the skills that match the role', () => {
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').eq(2).click()
    cy.get('.text-success').should('exist').contains('100')
  })

  it('User-13: should only show Application Status, Company Logo, and Logout options in the Navbar.', () => {
    cy.get('.defaultBtn').click()
    cy.get('.status').should('exist')
    cy.get('.logout').should('exist')
    cy.get('.talentNav').should('exist') // company logo
  })

  it('User 14 : should logout when logout button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.nav-link.logout').first().click()
    cy.get('.login').should('exist')
  })
})
