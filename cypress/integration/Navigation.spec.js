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

  it ('can start the timer', () => {
    cy.visit('/')

    // start the timer
    cy.contains('Start').click();
    
    // a pause button should apper that they can click on
    cy.contains('Pause').click();

    // a resume button should appear
    cy.contains('Resume').click();
  }) 
})