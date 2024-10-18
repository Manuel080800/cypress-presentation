import 'cypress-plugin-steps';

describe('login', () => {
  it('passes the login process', () => {
    cy.section('LOGIN');
    cy.login(Cypress.env('username'), Cypress.env('password'));

    cy.section('ASSERTIONS LOGIN')
    cy.url().should('include', Cypress.env('assertions').dashboard.url);
    cy.get('.pageheader').should('contain', Cypress.env('assertions').dashboard.name);
    cy.get('li.dropdown.profile').should('include.text', Cypress.env('name'));
  });
});