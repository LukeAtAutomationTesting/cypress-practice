/// <reference types="cypress" />

describe("Verify radio buttons via webdriveruni", () => {
    before(function () {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab
    });

    it("should check specific radio buttons", () => {
        cy.get('#radio-buttons').find("[type='radio']").first().check()
        cy.get('#radio-buttons').find("[type='radio']").eq(1).check()
    });

    it("should validate the state of specific radio buttons", () => {
        cy.get("[value='lettuce']").should('not.be.checked');
        cy.get("[value='cabbage']").should('be.disabled');
        cy.get("[value='pumpkin']").should('be.checked');
        
        cy.get("[value='lettuce']").check();
        cy.get("[value='lettuce']").should('be.checked');
        cy.get("[value='pumpkin']").should('not.be.checked');
    });
});