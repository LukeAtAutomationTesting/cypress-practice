import HomePage_PO from "../../support/pageObjects/webdriver-uni/Homepage_PO";
import ContactUs_PO from "../../support/pageObjects/webdriver-uni/ContactUs_PO";

/// <reference types="cypress" />

describe("Test Contact Us form via WebdriverUni", () => {
    Cypress.config('defaultCommandTimeout', 20000); // dodawanie timeoutu do konkretnego 'describe'

    const homepage_PO = new HomePage_PO(); // nowa instancja
    const contactUs_PO = new ContactUs_PO(); // nowa instancja

    before(function () {
        cy.fixture('example').then(function(data) {
            // this.data = data; // nie zawsze może zadziałać
            globalThis.data = data; // inicjalizowanie danych z pliku example.json
        });
    });

    beforeEach(function () {
        //cy.visit(Cypress.env("webdriveruni_homepage") + "/Contact-Us/contactus.html"); // wykorzystanie globalnej zmiennej z adresem URL
        homepage_PO.visitHomepage();
        //cy.pause(); // działa jak breakpoint w debugerze, pauzuje w danym momencie wykonywanie kodu
        // cy.wait(3000)  // czeka 3 sekundy
        homepage_PO.clickOnContactUsButton();  
    });

    it("should be able to submit a successful submission via contact us form", () => {
        cy.document().should('have.property', 'charset').and('equal', 'UTF-8');
        cy.title().should('include', 'WebDriver | Contact Us');
        cy.url().should('include', 'contactus');
        //cy.get('#contact-us').click({force: true})

        // NAJPROSTRZE PODEJŚCIE
        // cy.get('[name="first_name"]').type(data.first_name);
        // cy.get('[name="last_name"]').type(data.last_name);
        // cy.get('[name="email"]').type(data.email)
        // cy.get('textarea.feedback-input').type("How are you doing?")
        // cy.get('[type="submit"]').click();
        // cy.get('#contact_reply > h1').should('have.text', 'Thank You for your Message!');

        // PODEJŚCIE Z ZADEKLAROWNIEM CUSTOMOWEJ METODY W commands.js
        // cy.webdriverUni_ContactForm_Submission(
        //     Cypress.env("first_name"), 
        //     data.last_name, 
        //     data.email, 
        //     "How are you doing?", 
        //     '#contact_reply > h1', 
        //     'Thank You for your Message!'
        // );

        // PODEJŚCIE Z PAGE OBJECT MODELS
        contactUs_PO.contactFormSubmission('first_name', data.last_name, data.email, "How are you doing?", '#contact_reply > h1', 'Thank You for your Message!')
    });

    it("should not be able to submit a successful submission via contact us form as all fields are required", {browser: 'firefox'}, () => {
        // if (!Cypress.isBrowser('firefox')) {

            // NAJPROSTRZE PODEJŚCIE
            // cy.get('[name="first_name"]').type(data.first_name);
            // cy.get('[name="last_name"]').type(data.last_name);
            // cy.get('textarea.feedback-input').type("How are you doing?")
            // cy.get('[type="submit"]').click();
            // cy.get('body').contains('Error: all fields are required');

            // PODEJŚCIE Z ZADEKLAROWNIEM CUSTOMOWEJ METODY W commands.js
            cy.webdriverUni_ContactForm_Submission(
                data.first_name, 
                data.last_name, 
                " ", 
                "How are you doing?", 
                'body', 
                'Error: Invalid email address'
            );
            
        // }
    });
})