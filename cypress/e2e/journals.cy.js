import 'cypress-plugin-steps';

describe('journals', () => {
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
  const accessJournal = (assertions) => {
    cy.section('ACCESS JOURNAL');
    cy.contains('a', 'Contabilización SPX').click();
    cy.contains('a', 'Consulta de Diarios').click();

    cy.section('ASSERTIONS FOR ACCESS JOURNAL');
    cy.url().should('include', assertions.url);
    cy.get('.pageheader').should('contain', assertions.name)
  }

  const filterJournal = (parameters) => {
    cy.section('SEARCH JOURNAL')
    cy.get('select[name="mes"]').select(parameters.monthly)
    cy.get('select[name="anio"]').select(parameters.year)

    cy.section('ASSERTINS FOR SEARCH FILTER')
    cy.contains('h3.panel-title', 'LISTA DE POLIZAS').should('not.be.visible')
    cy.contains('button', 'Buscar').click()
    cy.contains('h3.panel-title', 'LISTA DE POLIZAS').should('be.visible')
  }
  
  it('passes the journals process', () => {
    login(Cypress.env('username'), Cypress.env('password'), Cypress.env('assertions').dashboard, Cypress.env('name'));
    company(Cypress.env('company'));
    accessJournal(Cypress.env('assertions').journal);
    filterJournal(Cypress.env('search'));
  });
});