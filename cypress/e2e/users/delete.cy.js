import 'cypress-plugin-steps'

describe('delete-user', () => {

  beforeEach(() => {
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
    cy.get('span[ng-click="ctrl.showEmpresas(true)"]').should('include.text', 'SIN EMPRESA ACTUAL')

    cy.contains('li.search', 'SIN EMPRESA ACTUAL').click()
    cy.contains('a.jstree-anchor', 'IAN Iglesia Adventista Nacional').click()
    cy.wait(2500)
    
    cy.get('span[ng-click="ctrl.showEmpresas(true)"]').should('include.text', 'IAN Iglesia Adventista Nacional')

    cy.section('SELECT USERS')
    cy.contains('a', 'Configuracion').click();
    cy.contains('a', 'Administración').click();
    cy.contains('a', 'Usuarios').click();


    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').user.name)
    cy.url().should('include', Cypress.env('validate').user.url);

    cy.section('DELETE USER')
    cy.get('button[title="Eliminar ' + Cypress.env('test').username + '"]').click();

    cy.get('p.lead.text-muted').should('include.text', 'Está seguro de eliminar el usuario ' + Cypress.env('test').username + '?')

    cy.contains('button.confirm', 'Aceptar').wait(2000).click()
    cy.wait(5000)

    cy.get('.alert.alert-success').should('be.visible').and('include.text', 'El usuario ' + Cypress.env('test').username + ' ha sido eliminado.');
  })
})