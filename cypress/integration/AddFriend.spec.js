/*
  Cypress Test for Add Friend Button
*/

import { firebase } from '../../config/firebase';
import 'firebase/auth';


describe ('Test Add Friend', () => {

  // refreshes app login state
  // logs in before running tests
  before(() => {
    firebase.auth().signOut(); // manually trigger firebase logout to ensure clean startup of app

    cy.visit('/');
    cy.wait(3000);
    const email = "xunchuan@bing.com";
    const password = "physics";
    cy.get('input').eq(0).type(email).should('have.value', email);
    cy.get('input').eq(1).type(password).should('have.value', password);
    cy.contains('Sign in').click();
    cy.wait(3000);    
  })  

  it('when the user clicks on Add Friend button, then user can type into search input and click Submit', () => {    
    cy.contains("Social").click();
    cy.wait(5000);
    cy.contains("Add friend").click();

    const searchEmail = 'claire@gmail.com';

    cy.get('input[placeholder="Type friend email"]').type(searchEmail).should('have.value', searchEmail);
    cy.contains('Submit').click();
  });  
});