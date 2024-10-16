import 'cypress-plugin-steps'

const attributes = {
  'city': 'input[data-ng-model="ctrl.ciudadSelected"]'
}

describe('create-user', () => {

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

    cy.section('CREATE USER')
    cy.step('SECTION 1')
    cy.contains('button', 'Crear Usuario').click()
    cy.get('#txtNombres').type('Cypress')
    cy.get('#txtApellidos').type('Automation')
    cy.contains('button.button-next', 'Siguiente').click()

    cy.step('SECTION 2')
    cy.get('#idEstado').select('Yucatán')
    cy.get('input[data-ng-model="ctrl.ciudadSelected"]').eq(1).type('Mé')
    cy.get('ul.dropdown-menu li').filter((index, el) => Cypress.$(el).text().trim() === 'Mérida').click()
    cy.get('[id="usuario.datosUbicacion.codigoPostal"]').type('97000');
    cy.get('[id="usuario.datosUbicacion.telefono"]').type('6517988486');
    cy.get('[id="usuario.datosUbicacion.direccion"]').type('Sin proporcionar');
    cy.get('#correoElectronico').type('automation@cypress.cy')
    cy.contains('button.button-next', 'Siguiente').click()
    
    cy.step('SECTION 3')
    cy.get('#idUsuario').type(Cypress.env('test').username)
    cy.get('#password').type(Cypress.env('test').password)
    cy.get('#passwordConfirm').type(Cypress.env('test').password)
    cy.get('input.select2-search__field[type="search"]').type('admin')
    cy.get('.select2-results__options').contains('administrador').click();
    cy.contains('button.button-submit', 'Crear Usuario').click()
    cy.contains('button.confirm', 'Guardar').wait(2000).click()
    cy.wait(5000)

    cy.section('LOGOUT')
    cy.get('li.dropdown.profile').click()
    cy.contains('a', 'Log Out').click();

    cy.section('LOGIN USING CYPRESS')
    cy.get('#usuario').type(Cypress.env('test').username)
    cy.get('#contraseña').type(Cypress.env('test').password)
    cy.get('button[type="submit"]').click()
    cy.wait(5000)
  })
})