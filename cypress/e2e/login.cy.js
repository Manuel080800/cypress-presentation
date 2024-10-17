import 'cypress-plugin-steps'

describe('login', () => {
  it('passed', () => {
    // normal
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))

    cy.get('#usuario').type(Cypress.env('username'))
    cy.get('#contraseña').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()

    // assersiones
    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').dashboard.name)
    cy.url().should('include', Cypress.env('validate').dashboard.url);
    cy.get('li.dropdown.profile').should('include.text', Cypress.env('name'))
  })
})