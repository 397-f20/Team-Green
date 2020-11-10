describe ('Test App', () => {
  it ('launches', () => {
    cy.visit('/');
  });

  it('logs in', () => {
    cy.visit('/');
    const email = "claire@gmail.com";
    const password = "123456";
    cy.get('input').eq(0).type(email).should('have.value', email);
    cy.get('input').eq(1).type(password).should('have.value', password);
    cy.contains("Sign in").click()

    cy.contains("Timer").click()
    cy.contains("Start").click()
    cy.contains("Pause")

    cy.contains("Social").click()
    cy.contains("Claire").click()
  })
});