/// <reference types="cypress" />

export default class ContactUs_PO {
    contactFormSubmission(firstName, lastName, email, comment, $selector, textToLocate) {
        cy.get('[name="first_name"]').type(firstName);
        cy.get('[name="last_name"]').type(lastName);
        cy.get('[name="email"]').type(email);
        cy.get('textarea.feedback-input').type(comment);
        cy.get('[type="submit"]').click();
        cy.get($selector).contains(textToLocate, {timeout: 10000}); // timeout dla konkretnej asercji
        cy.screenshot();
        cy.screenshot('Made a contact us form submission');
    }
}