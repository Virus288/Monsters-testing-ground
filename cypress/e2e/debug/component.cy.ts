import { it } from 'mocha';

describe('Test debug', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1212/');
  });

  describe('Action - Toggle notifications', () => {
    it('Should toggle default notification', () => {
      cy.get('#navbar').should('be.visible');

      cy.get('[data-cy="nav-button-debug"]').should('exist').click();

      cy.url().should('eq', 'http://localhost:1212/#/debug');
      cy.get('[data-cy="debug-header-main"]').should('exist');

      cy.get('[data-cy="debug-form-defaultNotification"]').should('exist');
      cy.get('[data-cy="debug-form-defaultNotification"] input').should('exist').type('testing');
      cy.get('[data-cy="debug-form-defaultNotification"] button').should('exist').click();

      cy.get('[data-cy="notification-default-body"]').should('exist');
      cy.get('[data-cy="notification-button-disable"]').should('exist').click();

      cy.get('[data-cy="notification-default-body"]').should('not.exist');
    });

    it('Should toggle update notification', () => {
      cy.get('#navbar').should('be.visible');

      cy.get('[data-cy="nav-button-debug"]').should('exist').click();

      cy.url().should('eq', 'http://localhost:1212/#/debug');
      cy.get('[data-cy="debug-header-main"]').should('exist');

      cy.get('[data-cy="debug-form-updateNotification"]').should('exist');
      cy.get('[data-cy="debug-form-updateNotification"] input').should('exist').type('testing');
      cy.get('[data-cy="debug-form-updateNotification"] button').should('exist').click();

      cy.get('[data-cy="notification-update-body"]').should('exist');
      cy.get('[data-cy="notification-button-disable"]').should('exist').click();

      cy.get('[data-cy="notification-update-body"]').should('not.exist');
    });
  });
});
