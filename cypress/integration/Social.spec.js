describe ('Test in Social Page', () => {
    it('given: logs in and navigate to social', () => {
        cy.visit('/');
        const email = "jing3@gmail.com";
        const password = "123456";
        cy.get('input').eq(0).type(email).should('have.value', email);
        cy.get('input').eq(1).type(password).should('have.value', password);
        cy.contains("Sign in").click();

        cy.contains("Social").click();
    });

    it('when-then: when user click dropdown, see a friend list and navigate to fishtank of friend', () => {
        cy.contains("You").click();
        cy.contains("jing").click();
    });

  });