import 'cypress-plugin-steps'

describe('update-user', () => {

  beforeEach(() => {
    cy.section('LOGIN')
    cy.visit(Cypress.env('url'))
    cy.get('#usuario').type(Cypress.env('test').username)
    cy.get('#contraseña').type(Cypress.env('test').password)
    cy.get('button[type="submit"]').click()
    cy.wait(1500)

    // assersiones
    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').dashboard.name)
    cy.url().should('include', Cypress.env('validate').dashboard.url);
    cy.get('li.dropdown.profile').should('include.text', Cypress.env('test').name)

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

    cy.section('UPDATE USER')
    cy.get('button[title="Actualizar ' + Cypress.env('test').username + '"]').click();

    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').user.update.name)
    cy.url().should('include', Cypress.env('validate').user.update.url);

    cy.step('UPDATE USER: SECTION 1')
    cy.get('a[href="#datosUsuarioTab"]').should('include.text', '1 Datos De Usuario')

    cy.get('#txtApellidos').clear().type('Framework')
    cy.contains('button.button-next', 'Siguiente').click()
    
    cy.step('UPDATE USER: SECTION 2')
    cy.get('a[href="#datosUbicacionTab"]').should('include.text', '2 Datos De Ubicación')

    cy.get('[id="usuario.datosUbicacion.direccion"]').clear().type('Implementado en esta plataforma');
    cy.get('#correoElectronico').clear().type('framework@cypress.cy')
    cy.contains('button.button-next', 'Siguiente').click()

    cy.step('UPDATE USER: SECTION 3')
    cy.get('a[href="#cuentaAccesoTab"]').should('include.text', '3 Cuenta De Acceso')

    cy.get('input.select2-search__field[type="search"]').type('cont')
    cy.get('.select2-results__options').contains('contador').click();
    cy.contains('button.button-submit', 'Modificar Usuario').click()
    cy.contains('button.confirm', 'Guardar').wait(2000).click()
    cy.wait(5000)

    cy.get('.alert.alert-success').should('be.visible').and('include.text', 'El usuario "' + Cypress.env('test').username + '" ha sido modificado satisfactoriamente.');
  })
})