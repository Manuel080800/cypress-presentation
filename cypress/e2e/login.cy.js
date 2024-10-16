import 'cypress-plugin-steps'

describe('login', () => {
  it('passed', () => {
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))
    cy.get('#usuario').type(Cypress.env('username'))
    cy.get('#contraseña').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
    cy.wait(5000)
  })
})