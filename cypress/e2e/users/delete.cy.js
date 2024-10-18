import 'cypress-plugin-steps';

describe('delete-user', () => {
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

  const deleteUser = (username) => {
    cy.section('DELETE USER');
    cy.get('button[title="Eliminar ' + username + '"]').click();

    cy.section('ASSERTINS FOR DELETE USER');
    cy.get('p.lead.text-muted').should('include.text', 'Está seguro de eliminar el usuario ' + username + '?');
    cy.contains('button.confirm', 'Aceptar').wait(2000).click();
    cy.get('.alert.alert-success').should('be.visible').and('include.text', 'El usuario ' + username + ' ha sido eliminado.');
  }
  
  it('passes the delete user process', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('assertions').dashboard, Cypress.env('name'));
    company(Cypress.env('company'));
    accessUsers(Cypress.env('assertions').user);
    deleteUser(Cypress.env('test').username);
    cy.wait(5000);
  });
});