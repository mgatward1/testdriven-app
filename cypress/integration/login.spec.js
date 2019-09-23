const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';


describe('Login', () => {

    it('should display the sign in form', () => {
        cy
          .visit('/login')
          .get('h1').contains('Log In')
          .get('form')
          .get('input[disabled]')
          .get('.validation-list')  // new
          .get('.validation-list > .error').first().contains(
            'Email is required.');  // new
      });


     

      it('should throw an error if the credentials are incorrect', () => {
        // attempt to log in
        cy
          .visit('/login')
          .get('input[name="email"]').type('incorrect@email.com')
          .get('input[name="password"]').type(password)
          .get('input[type="submit"]').click();
      
        // assert user login failed
        cy.contains('All Users').should('not.be.visible');
        cy.contains('Log In');
        cy.get('.navbar-burger').click();
        cy.get('.navbar-menu').within(() => {
          cy
            .get('.navbar-item').contains('User Status').should('not.be.visible')
            .get('.navbar-item').contains('Log Out').should('not.be.visible')
            .get('.navbar-item').contains('Log In')
            .get('.navbar-item').contains('Register');
        });
        cy
          .get('.notification.is-success').should('not.be.visible')
          .get('.notification.is-danger').contains('User does not exist.');
      
        // attempt to log in
        cy
          .get('a').contains('Log In').click()
          .get('input[name="email"]').type(email)
          .get('input[name="password"]').type('incorrectpassword')
          .get('input[type="submit"]').click()
          .wait(100);
      
        // assert user login failed
        cy.contains('All Users').should('not.be.visible');
        cy.contains('Log In');
        cy.get('.navbar-burger').click();
        cy.get('.navbar-menu').within(() => {
          cy
            .get('.navbar-item').contains('User Status').should('not.be.visible')
            .get('.navbar-item').contains('Log Out').should('not.be.visible')
            .get('.navbar-item').contains('Log In')
            .get('.navbar-item').contains('Register');
        });
        cy
          .get('.notification.is-success').should('not.be.visible')
          .get('.notification.is-danger').contains('User does not exist.');
      });
});