import 'cypress-plugin-steps'

describe('login', () => {
    it('should login and verify API response and dashboard', () => {
      cy.section('LOGIN');
      
      // Visit the login URL
      cy.visit(Cypress.env('url'));
  
      // Enter username and password
      cy.get('#usuario').type(Cypress.env('username'));
      cy.get('#contraseña').type(Cypress.env('password'));
  
      // Submit the form
      cy.get('button[type="submit"]').click();
      
      // Verify that the page header contains the dashboard name
      cy.get('.pageheader').should('contain', Cypress.env('validate').dashboard.name);
  
      // Verify the URL contains the expected fragment
      cy.url().should('include', Cypress.env('validate').dashboard.url);
    });
  });
  