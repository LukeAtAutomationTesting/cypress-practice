/// <reference types="cypress" />

describe("verify checkboxes via webdriveruni", () => {
    beforeEach(function () {
        //cy.visit('/'); // ten slash oznacza przejście do cypress.json i pobranie baseUrl
        cy.navigateTo_WebdriverUni_Homepage();  // custom command - commands.js
        cy.navigateTo_WebdriverUni_Checkbox_Page();
    })
    
    it("should check and validate checkox", () => {
        //cy.get('#checkboxes > :nth-child(1) > input').check()
        //cy.get('#checkboxes > :nth-child(1) > input').check().should('be.checked')

        cy.get('#checkboxes > :nth-child(1) > input').as('option-1');

        cy.get('@option-1').check()
        cy.get('@option-1').check().should('be.checked')
    });

    it("should uncheck and validate checkox", () => {
        cy.get('#checkboxes > :nth-child(5) > input').as('option-3');
        cy.get('@option-3').uncheck().should('not.be.checked')
    });

    it("should check multiple checkboxes", () => {
        cy.get("input[type='checkbox']").check(["option-1", "option-2", "option-3", "option-4"]).should('be.checked');
    });
});