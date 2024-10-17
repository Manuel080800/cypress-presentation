import 'cypress-plugin-steps'

describe('search', () => {

  const parameters = {
    monthly: '1',
    year: '2018'
  }

  beforeEach(() => {
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

    cy.wait(2500)
  })

  it('passes', () => {
    cy.section('SELECT COMPANY')

    cy.get('span[ng-click="ctrl.showEmpresas(true)"]').should('include.text', 'SIN EMPRESA ACTUAL')

    cy.contains('li.search', 'SIN EMPRESA ACTUAL').click()
    cy.contains('a.jstree-anchor', 'IAN Iglesia Adventista Nacional').click()
    cy.wait(5000)
    
    cy.get('span[ng-click="ctrl.showEmpresas(true)"]').should('include.text', 'IAN Iglesia Adventista Nacional')

    cy.section('ACCESS SETTINGS')
    cy.contains('a', 'Contabilización SPX').click()
    cy.contains('a', 'Consulta de Diarios').click()

    cy.url().should('include', Cypress.env('validate').journal.url);
    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').journal.name)

    cy.section('SEARCH JOURNAL WITH FILTER')
    cy.get('select[name="mes"]').select(parameters.monthly)
    cy.get('select[name="anio"]').select(parameters.year)

    cy.contains('h3.panel-title', 'LISTA DE POLIZAS').should('not.be.visible')

    cy.contains('button', 'Buscar').click()
    cy.wait(5000)

    cy.contains('h3.panel-title', 'LISTA DE POLIZAS').should('be.visible')
    
    cy.wait(5000)
  })
})