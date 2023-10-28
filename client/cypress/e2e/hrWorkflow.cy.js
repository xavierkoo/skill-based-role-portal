describe('HR Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('HR-1: should display the login page', () => {
    cy.get('.login').should('exist')
  })

  it('HR-2: should log in as an HR and redirect to the role listings page displaying a list of available role listings', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
  })

  it('HR-3: should filter roles by skill successfully', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('select.form-select').select('Python Programming')
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('HR-4: should display all relevant details in a job role item', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().should('exist')
    cy.get('.card-title').should('exist') // role name
    cy.get('#rstatus').should('exist') // role status
    cy.get('#rmanage').should('exist') // role manage button
    cy.get('.fw-bold.badge.rounded-pill').should('exist') // skill match percentage
    cy.get('.badge.rounded-pill.bg-light.text-dark').should('exist') // skills
    cy.get('.card-text').should('exist') // description
    cy.get('#rPubDate').should('exist').contains('Published Date') // publish date
    cy.get('small').should('exist').contains('Closing Date') // expiry date
  })

  it('HR-5: should display expanded role details when a role header is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.card-text').should('exist')
  })

  it('HR-6: should display all relevant elements in the expanded role details', () => {
    cy.get('#dropdown').select('HR')
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
    cy.get('.artdeco-button__text').should('exist').contains('Apply') // apply button
    cy.get('.artdeco-button__text').should('exist').contains('Update') // update button
    cy.get('.description').should('exist') // description
  })

  it('HR-7: should open the application modal when apply button is clicked', () => {
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.badge.rounded-pill.bg-primary.text-white.p-2').first().click()
    cy.get('#applicationModal').should('exist')
  })

  it('HR-8: should display all relevant elements in the application modal', () => {
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.badge.rounded-pill.bg-primary.text-white.p-2').first().click()
    cy.get('#application')
      .should('exist')
      .contains(/Role Listing ID: \d+/) // role listing id dynamic id
    cy.get('#roleName').should('have.value', 'Head, Talent Attraction') // role name
    cy.get('.form-label').should('exist').contains('Why do you want this role? (Max 100 words)')
    cy.get('.form-control').should('exist')
    cy.get('.modal-footer').should('exist').contains('Submit')
  })

  it('HR-9: should display update role listing page when update button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').should('exist').contains('Update').click()
    cy.get('.updateRoleListing').should('exist')
  })

  it('HR-10: should return to role listings page when back button is clicked and display all relevant elements', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').should('exist').contains('Update').click()
    cy.get('.back').should('exist').click()
    cy.get('.job-role-item').should('exist')
  })

  it('HR-11: should return two error messages when update button is clicked with close date that is not later than or equal to the current date and Role Listing Open date not earlier than Role Listing Close date', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').contains(' Update ').click()
    cy.get('#startDate').type('2020-01-01')
    cy.get('#closeDate').type('2020-01-01')
    cy.get('#update').should('exist').click()
    cy.get('.my-auto')
      .should('exist')
      .contains('Role Listing Close date must be a date later than or equal to the Current date')
    cy.get('.my-auto').contains(
      'Role Listing Open date must be a date earlier than Role Listing Close date'
    )
  })
  it('HR-12: should return a success message when role listing is updated successfully', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').contains(' Update ').click()
    cy.get('#startDate').type('2030-01-01')
    cy.get('#closeDate').type('2050-01-01')
    cy.get('#update').should('exist').click()
    cy.get('.noti').should('exist').contains('Role Listing Successfully Updated')
  })

  it('HR-13: should navigate to the create role listing page when create role listing nav bar button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('#create').click()
    cy.get('#exampleModal').should('exist')
  })

  it('HR-14: should show error notification when create role listing button is clicked with invalid input', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('#create').click()
    cy.get('.defaultBtn').click()
    cy.get('.text-danger').should('exist').contains('Role Listing Creation Failed')
  })

  it('HR-15: should direct to view role applicants page when view role applicants button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('#applicants').click()
    cy.get('h2').should('exist').contains('Role Applicants')
  })

  it('HR-16: should logout when logout button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.nav-link.logout').first().click()
    cy.get('.login').should('exist')
  })

  it('HR-17: should only show Create Application, View Role Applicants, Application Status, Company Logo, and Logout options in the Navbar.', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.status').should('exist')
    cy.get('#applicants').should('exist')
    cy.get('#create').should('exist')
    cy.get('.logout').should('exist')
    cy.get('.talentNav').should('exist') // company logo
  })
})
