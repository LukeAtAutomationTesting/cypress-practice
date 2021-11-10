export default class HomePage_PO {
    visitHomepage() {
        // cy.visit(Cypress.env("webdriveruni_homepage"));
        cy.visit(Cypress.env("webdriveruni_homepage"), {timeout: 60000}); // można dodac osobny timeout do wykonania danej czynności
    }

    clickOnContactUsButton() {
        cy.get('#contact-us').invoke('removeAttr', 'target').click({force: true}, {timeout: 8000});  // dodany timeout dla akcji kliknięcia
    }
}