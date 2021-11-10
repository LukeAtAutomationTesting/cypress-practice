/// <reference types="cypress" />

describe("Validate WebdriverUni homepage links", () => {
    it("should confirm link redirects to the correct pages", () => {
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#contact-us').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab
        cy.url().should('include', 'contactus');

        cy.go('back');
        cy.reload()
        cy.url().should('include', 'http://www.webdriveruniversity.com');
        //cy.reload() //reload without using cache

        cy.go('forward');
        cy.url().should('include', 'contactus');

        cy.go('back');
        cy.get('#login-portal').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab
        cy.url().should('include', 'Login-Portal');
        cy.go('back');

        cy.get('#to-do-list').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab
        cy.url().should('include', 'To-Do-List');
        cy.go('back');
    });
})