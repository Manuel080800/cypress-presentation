import 'cypress-plugin-steps';

describe('create-user', () => {
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

  const createUser = (assertions) => {
    cy.section('CREATE USER');
    cy.contains('button', 'Crear Usuario').click();

    cy.section('ASSERTINS FOR CREATE USER');
    cy.url().should('include', assertions.url);
    cy.get('.pageheader').should('contain', assertions.name);
  }

  const completeDataUser = (data) => {
    cy.section('COMPLETE DATA USER');
    cy.get('#txtNombres').type(data.name);
    cy.get('#txtApellidos').type(data.lastName);

    cy.section('ASSERTINS FOR COMPLETE DATA USER');
    cy.get('a[href="#datosUsuarioTab"]').should('include.text', '1 Datos De Usuario');
    cy.contains('button.button-next', 'Siguiente').click();
  }

  const completeLocationUser = (data) => {
    cy.section('COMPLETE LOCATION USER');
    cy.get('#idEstado').select(data.state);
    cy.get('input[data-ng-model="ctrl.ciudadSelected"]').eq(1).type(data.city.shortName);
    cy.get('ul.dropdown-menu li').filter((index, el) => Cypress.$(el).text().trim() === data.city.name).click();
    cy.get('[id="usuario.datosUbicacion.codigoPostal"]').type(data.postalCode);
    cy.get('[id="usuario.datosUbicacion.telefono"]').type(data.phone);
    cy.get('[id="usuario.datosUbicacion.direccion"]').type(data.dataLocation);
    cy.get('#correoElectronico').type(data.email);

    cy.section('ASSERTINS FOR COMPLETE LOCATION USER');
    cy.get('a[href="#datosUbicacionTab"]').should('include.text', '2 Datos De Ubicación');
    cy.contains('button.button-next', 'Siguiente').click();
  }

  const completeAccountUser = (username, password, data) => {
    cy.section('COMPLETE ACCOUNT USER');
    cy.get('#idUsuario').type(username)
    cy.get('#idUsuario').blur(); 

    cy.step('VALIDATION USER');
    cy.get('body').wait(2000).then(($body) => {
      if ($body.find('#toast-container').length > 0) {
        if ($body.find('#toast-container:contains("El usuario ya está en uso")').length > 0) {
          throw new Error('expected ' + '"' + username + '"' +' to exists');
        }
      }
    });

    cy.get('#password').type(password);
    cy.get('#passwordConfirm').type(password);
    cy.get('input.select2-search__field[type="search"]').type(data.rol.shortName);
    cy.get('.select2-results__options').contains(data.rol.name).click();

    cy.section('ASSERTINS FOR COMPLETE ACCOUNT USER');
    cy.get('a[href="#cuentaAccesoTab"]').should('include.text', '3 Cuenta De Acceso');
    cy.contains('button.button-submit', 'Crear Usuario').click();
    cy.contains('button.confirm', 'Guardar').wait(2000).click();
    cy.get('.alert.alert-success').should('be.visible').and('include.text', 'El usuario "' + username + '" ha sido creado satisfactoriamente.');
  }

  const logout = () => {
    cy.section('LOGOUT');
    cy.get('li.dropdown.profile').click();
    cy.contains('a', 'Log Out').click();
  }
  
  it('passes the create user process', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('assertions').dashboard, Cypress.env('name'));
    company(Cypress.env('company'));
    accessUsers(Cypress.env('assertions').user);
    createUser(Cypress.env('assertions').user.create);
    completeDataUser(Cypress.env('test').data);
    completeLocationUser(Cypress.env('test').data);
    completeAccountUser(Cypress.env('test').username, Cypress.env('test').password, Cypress.env('test').data);
    logout();
    login(Cypress.env('test').username, Cypress.env('test').password, Cypress.env('assertions').dashboard, Cypress.env('test').name);
    cy.wait(5000);
  });
});