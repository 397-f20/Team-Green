describe('Check tab navigator', () => {
  it ('tests tab navigator working across three tabs', () => {
    cy.visit('/')

    // visit the left tab
    cy.contains('Social').click();
    
    // visit the right tab
    cy.contains('Profile').click();

    // return to initial timer tab
    cy.contains('Timer').click();
  }) 
})