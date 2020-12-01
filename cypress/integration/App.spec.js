describe ('Test App', () => {
  it ('launches', () => {
    cy.visit('/');
  });

  it('logs in', () => {
    cy.visit('/');
    cy.wait(3000)
    const email = "claire@gmail.com";
    const password = "123456";
    cy.get('input').eq(0).type(email).should('have.value', email);
    cy.get('input').eq(1).type(password).should('have.value', password);
    cy.contains("Sign in").click()

    cy.wait(3000);
    cy.contains("Timer").click()
    cy.contains("Start").click()
    cy.contains("Pause")
  })

  it('when-then: when user naviagte to Tank tab, see a friend list and navigate to fishtank of friend', () => {
    cy.visit('/');
    cy.wait(3000);
    cy.contains("Tank").click();
    cy.contains("(You)").click();
    cy.contains("Atul").click();
});
});