import { it } from 'mocha';

describe('Test redux', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1212/');
  });

  describe('Action - Toggle notification', () => {
    it('Should toggle notification', () => {
      cy.window()
        .its('store')
        .invoke('getState')
        .its('notifications')
        .its('messages')
        .should((data) => {
          const amount = data.length;
          expect(amount).to.deep.eq(0);
        });

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

      cy.window()
        .its('store')
        .invoke('getState')
        .its('notifications')
        .its('messages')
        .should((data) => {
          const amount = data.length;
          expect(amount).to.deep.eq(0);
        });
    });
  });
});
