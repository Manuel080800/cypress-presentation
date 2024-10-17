import 'cypress-plugin-steps'

const attributes = {
  'city': 'input[data-ng-model="ctrl.ciudadSelected"]'
}

describe('create-user', () => {

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
    cy.wait(2500)
    
    cy.get('span[ng-click="ctrl.showEmpresas(true)"]').should('include.text', 'IAN Iglesia Adventista Nacional')

    

    cy.section('SELECT USERS')
    cy.contains('a', 'Configuracion').click();
    cy.contains('a', 'Administración').click();
    cy.contains('a', 'Usuarios').click();

    cy.section('CREATE USER')

    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').user.name)
    cy.url().should('include', Cypress.env('validate').user.url);

    cy.contains('button', 'Crear Usuario').click()

    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').user.create.name)
    cy.url().should('include', Cypress.env('validate').user.create.url);

    cy.get('a[href="#datosUsuarioTab"]').should('include.text', '1 Datos De Usuario')

    cy.get('#txtNombres').type('Cypress')
    cy.get('#txtApellidos').type('Automation')
    cy.contains('button.button-next', 'Siguiente').click()

    cy.get('a[href="#datosUbicacionTab"]').should('include.text', '2 Datos De Ubicación')

    cy.get('#idEstado').select('Yucatán')
    cy.get('input[data-ng-model="ctrl.ciudadSelected"]').eq(1).type('Mé')
    cy.get('ul.dropdown-menu li').filter((index, el) => Cypress.$(el).text().trim() === 'Mérida').click()
    cy.get('[id="usuario.datosUbicacion.codigoPostal"]').type('97000');
    cy.get('[id="usuario.datosUbicacion.telefono"]').type('6517988486');
    cy.get('[id="usuario.datosUbicacion.direccion"]').type('Sin proporcionar');
    cy.get('#correoElectronico').type('automation@cypress.cy')
    cy.contains('button.button-next', 'Siguiente').click()
    
    cy.get('a[href="#cuentaAccesoTab"]').should('include.text', '3 Cuenta De Acceso')

    cy.intercept('GET', '/api/your-endpoint').as('getToast');
    cy.get('#idUsuario').type(Cypress.env('test').username)
    cy.get('#idUsuario').blur(); 


    cy.get('body').wait(2000).then(($body) => {
      if ($body.find('#toast-container').length > 0) {
        if ($body.find('#toast-container:contains("El usuario ya está en uso")').length > 0) {
          throw new Error('expected ' + '"' + '#toast-container:contains("El usuario ya está en uso")' + '"' +' to exists');
        }
      }
    });

    cy.get('#password').type(Cypress.env('test').password)
    cy.get('#passwordConfirm').type(Cypress.env('test').password)
    cy.get('input.select2-search__field[type="search"]').type('admin')
    cy.get('.select2-results__options').contains('administrador').click();
    cy.contains('button.button-submit', 'Crear Usuario').click()
    cy.contains('button.confirm', 'Guardar').wait(2000).click()

    cy.wait(5000)

    cy.get('.alert.alert-success').should('be.visible').and('include.text', 'El usuario "' + Cypress.env('test').username + '" ha sido creado satisfactoriamente.');

    cy.section('LOGOUT')
    cy.get('li.dropdown.profile').click()
    cy.contains('a', 'Log Out').click();

    cy.section('LOGIN USING CYPRESS')
    cy.get('#usuario').type(Cypress.env('test').username)
    cy.get('#contraseña').type(Cypress.env('test').password)
    cy.get('button[type="submit"]').click()
    cy.wait(5000)

    // assersiones
    cy.get('.pageheader').wait(2000).should('contain', Cypress.env('validate').dashboard.name)
    cy.url().should('include', Cypress.env('validate').dashboard.url);
    cy.get('li.dropdown.profile').should('include.text', Cypress.env('test').name)
  })
})