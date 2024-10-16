import 'cypress-plugin-steps'

describe('search', () => {

  const parameters = {
    monthly: '1',
    year: '2018'
  }

  beforeEach(() => {
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))
    cy.get('#usuario').type(Cypress.env('username'))
    cy.get('#contraseña').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
    cy.wait(2500)
  })

  it('passes', () => {
    cy.section('SELECT COMPANY')
    cy.contains('li.search', 'SIN EMPRESA ACTUAL').click()
    cy.contains('a.jstree-anchor', 'IAN Iglesia Adventista Nacional').click()

    cy.section('ACCESS SETTINGS')
    cy.contains('a', 'Contabilización SPX').click()
    cy.contains('a', 'Consulta de Diarios').click()

    cy.section('SEARCH JOURNAL WITH FILTER')
    cy.get('select[name="mes"]').select(parameters.monthly)
    cy.get('select[name="anio"]').select(parameters.year)
    cy.contains('button', 'Buscar').click()
    cy.wait(5000)
  })
})