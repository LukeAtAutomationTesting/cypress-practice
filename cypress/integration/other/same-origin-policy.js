/// <reference types="cypress" />

describe("Cypress web security", () => {
    it.skip("should validate visiting two different domains", () => {
        // this approach doesn't work
        cy.visit('https://webdriveruniversity.com/')
        cy.visit('https://automationteststore.com/')
    });

    it("should validate visiting two different domains via user actions", () => {
        // this approach works using the "chromeWebSecurity": false in the cypress.json
        cy.visit('https://webdriveruniversity.com/')
        cy.get('#automation-test-store').invoke('removeAttr', 'target').click()
    });
})