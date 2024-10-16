import 'cypress-plugin-steps'

describe('delete-user', () => {

  beforeEach(() => {
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))
    cy.get('#usuario').type(Cypress.env('username'))
    cy.get('#contraseña').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
    cy.wait(1500)
  })

  it('passes', () => {
    cy.section('SELECT COMPANY')
    cy.contains('li.search', 'SIN EMPRESA ACTUAL').click()
    cy.contains('a.jstree-anchor', 'IAN Iglesia Adventista Nacional').click()

    cy.section('SELECT USERS')
    cy.contains('a', 'Configuracion').click();
    cy.contains('a', 'Administración').click();
    cy.contains('a', 'Usuarios').click();

    cy.section('DELETE USER')
    cy.get('button[title="Eliminar ' + Cypress.env('test').username + '"]').click();
    cy.contains('button.confirm', 'Aceptar').wait(2000).click()
    cy.wait(5000)
  })
})