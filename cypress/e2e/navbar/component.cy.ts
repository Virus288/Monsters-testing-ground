import { it } from 'mocha';

describe('Test navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1212/');
  });

  describe('Action - Toggle navbar', () => {
    it('Should toggle navbar', () => {
      const toggle = cy.get('[data-cy="navSwitch"]');

      cy.get('#navbar').should('be.visible');
      cy.get('#navbar').invoke('width').should('eq', 150);

      cy.get('[data-cy="navSwitch"]').should('be.visible');
      toggle.click();

      cy.get('#navbar').invoke('width').should('eq', 150);
      toggle.click();

      cy.get('#navbar').invoke('width').should('eq', 75);
      toggle.click();

      cy.get('#navbar').invoke('width').should('eq', 150);
    });
  });

  describe('Action - Change routes', () => {
    it('Should change route', () => {
      cy.get('#navbar').should('be.visible');

      cy.get('[data-cy="nav-button-route"]').click();

      cy.url().should('eq', 'http://localhost:1212/#/route');
      cy.get('[data-cy="404-button-home"]').should('exist').click();

      cy.url().should('eq', 'http://localhost:1212/#/');
      cy.contains('h2', 'Home page').should('exist');

      cy.get('[data-cy="nav-button-settings"]').should('exist').click();

      cy.url().should('eq', 'http://localhost:1212/#/');
      cy.get('[data-cy="settings-header-main"]').should('exist');

      cy.get('[data-cy="settings-button-exit"]').should('exist').click();
      cy.get('[data-cy="nav-button-debug"]').should('exist').click();

      cy.url().should('eq', 'http://localhost:1212/#/debug');
      cy.get('[data-cy="debug-header-main"]').should('exist');
    });
  });
});
