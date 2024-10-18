import 'cypress-plugin-steps';

describe('update-user', () => {
  // Globals steps
  const login = (username, password, assertions, name) => {
    cy.section('LOGIN');
    cy.login(username, password);

    cy.section('ASSERTIONS FOR LOGIN');
    cy.url().should('include', assertions.url);
    cy.get('.pageheader').should('contain', assertions.name);
    cy.get('li.dropdown.profile').should('include.text', name);
  }

  const company = (company) => {
    cy.section('SELECT COMPANY');
    cy.company();

    cy.section('ASSERTIONS FOR SELECT COMPANY');
    cy.get('span[ng-click="ctrl.showEmpresas(true)"]').should('include.text', company);
  }

  // Specific steps
  const accessUsers = (assertions) => {
    cy.section('ACCESS USER');
    cy.contains('a', 'Configuracion').click();
    cy.contains('a', 'Administración').click();
    cy.contains('a', 'Usuarios').click();

    cy.section('ASSERTIONS FOR ACCESS USER');
    cy.url().should('include', assertions.url);
    cy.get('.pageheader').should('contain', assertions.name);
  }

  const updateUser = (username, assertions) => {
    cy.section('UPDATE USER');
    cy.get('button[title="Actualizar ' + username + '"]').click();

    cy.section('ASSERTINS FOR UPDATE USER');
    cy.url().should('include', assertions.url);
    cy.get('.pageheader').should('contain', assertions.name);
  }

  const completeDataUser = (data) => {
    cy.section('COMPLETE DATA USER');
    cy.get('#txtApellidos').clear().type(data.lastName);

    cy.section('ASSERTINS FOR COMPLETE DATA USER');
    cy.get('a[href="#datosUsuarioTab"]').should('include.text', '1 Datos De Usuario');
    cy.contains('button.button-next', 'Siguiente').click();
  }

  const completeLocationUser = (data) => {
    cy.section('COMPLETE LOCATION USER');
    cy.get('[id="usuario.datosUbicacion.direccion"]').clear().type(data.dataLocation);
    cy.get('#correoElectronico').clear().type(data.email)

    cy.section('ASSERTINS FOR COMPLETE LOCATION USER');
    cy.get('a[href="#datosUbicacionTab"]').should('include.text', '2 Datos De Ubicación');
    cy.contains('button.button-next', 'Siguiente').click();
  }

  const completeAccountUser = (username, data) => {
    cy.section('COMPLETE ACCOUNT USER');
    cy.get('input.select2-search__field[type="search"]').type(data.rol.shortName);
    cy.get('.select2-results__options').contains(data.rol.name).click();

    cy.section('ASSERTINS FOR COMPLETE ACCOUNT USER');
    cy.get('a[href="#cuentaAccesoTab"]').should('include.text', '3 Cuenta De Acceso');
    cy.contains('button.button-submit', 'Modificar Usuario').click();
    cy.contains('button.confirm', 'Guardar').wait(2000).click();
    cy.get('.alert.alert-success').should('be.visible').and('include.text', 'El usuario "' + username + '" ha sido modificado satisfactoriamente.');
  }
  
  it('passes the update user process', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('assertions').dashboard, Cypress.env('name'));
    company(Cypress.env('company'));
    accessUsers(Cypress.env('assertions').user);
    updateUser(Cypress.env('test').username, Cypress.env('assertions').user.update);
    completeDataUser(Cypress.env('test').update);
    completeLocationUser(Cypress.env('test').update);
    completeAccountUser(Cypress.env('test').username, Cypress.env('test').update);
  });
});