describe('Navigation', () => {
  beforeEach(()=>{
    cy.visit("/");
    cy.get('[data-testid=drawer-opener]').click();
    cy.get('[data-testid=login-opener]').click();
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('1245');
    cy.contains('button', 'LogIn').click();
  });

  xit('should navigate to login Form and login into Web', () => {
    cy.get('[data-testid=drawer-opener]').click();
    cy.get('[data-testid=login-opener]').click();
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('1245');
    cy.contains('button', 'LogIn').click();
  });

  xit('login user should buy and send txt to seller', () => {
    cy.get('[alt="garage"]').first().click();
    cy.contains('button', 'I WILL BUY!').first().click();
    cy.contains('button', 'Send BUY MSG!').click();
    cy.get('[data-testid=send-text]').click();
    cy.wait(300);
    cy.contains('button', 'PENDING');
  });

});
