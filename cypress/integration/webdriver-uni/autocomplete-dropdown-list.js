/// <reference types="cypress" />

describe("Verify autocomplete dropdown lists via webdriveruni", () => {
    it("should select specific product via autocomplete list", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#myInput').type('A')

        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prod = $el.text();
            const productToSelect = 'Avacado';

            if (prod === productToSelect) {
                $el.click();

                cy.get('#submit-button').click();
                cy.url().should('include', productToSelect);
            }
        }).then(() => {
            cy.get('#myInput').type('G')
            cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
                const prod = $el.text();
                const productToSelect = 'Grapes';
    
                if (prod === productToSelect) {
                    $el.click();
    
                    cy.get('#submit-button').click();
                    cy.url().should('include', productToSelect);
                }
            })
        })
    });
});