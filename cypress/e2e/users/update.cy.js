import 'cypress-plugin-steps'

describe('update-user', () => {

  beforeEach(() => {
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))
    cy.get('#usuario').type(Cypress.env('test').username)
    cy.get('#contraseña').type(Cypress.env('test').password)
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

    cy.section('UPDATE USER')
    cy.get('button[title="Actualizar ' + Cypress.env('test').username + '"]').click();

    cy.step('UPDATE USER: SECTION 1')
    cy.get('#txtApellidos').clear().type('Framework')
    cy.contains('button.button-next', 'Siguiente').click()
    
    cy.step('UPDATE USER: SECTION 2')
    cy.get('[id="usuario.datosUbicacion.direccion"]').clear().type('Implementado en esta plataforma');
    cy.get('#correoElectronico').clear().type('framework@cypress.cy')
    cy.contains('button.button-next', 'Siguiente').click()

    cy.step('UPDATE USER: SECTION 3')
    cy.get('input.select2-search__field[type="search"]').type('cont')
    cy.get('.select2-results__options').contains('contador').click();
    cy.contains('button.button-submit', 'Modificar Usuario').click()
    cy.contains('button.confirm', 'Guardar').wait(2000).click()
    cy.wait(5000)
  })
})