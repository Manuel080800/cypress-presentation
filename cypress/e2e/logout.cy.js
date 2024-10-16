import 'cypress-plugin-steps'

describe('logout', () => {

  beforeEach(() => {
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))
    cy.get('#usuario').type(Cypress.env('username'))
    cy.get('#contraseña').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
    cy.wait(2500)
  })

  it('passes', () => {
    cy.get('li.dropdown.profile').click()
    cy.contains('a', 'Log Out').click();
  })
})