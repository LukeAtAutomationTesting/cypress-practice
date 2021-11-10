/// <reference types="Cypress" />

describe('Verifying variables, cypress commands and jquery commands', () => {
    it('Navigating to the specific product pages', () => {
        cy.visit('https://automationteststore.com/');
        const makeupLink = cy.get("a[href*='product/category&path=']").contains('Makeup');
        makeupLink.click();
        const skincareLink = cy.get("a[href*='product/category&path=']").contains('Skincare');
        skincareLink.click();
    });

    it('Navigating to the specific product pages', () => {
        cy.visit('https://automationteststore.com/');
        cy.get("a[href*='product/category&path=']").contains('Makeup').click();
        
        cy.get('h1 .maintext').then(($headerText) => {
            const headertext = $headerText.text();
            cy.log(`Found header text: ${headertext}`);

            expect(headertext).is.eq('Makeup');
        });
    });

    it.only('Validate properties of the Contact Us page', () => {
        cy.visit('https://automationteststore.com/index.php?rt=content/contact');

        // Uses Cypress commands and chaining
        cy.contains('#ContactUsFrm', 'Contact Us Form').find('#field_11').should('contain', 'First name');

        // JQuery approach
        cy.contains('#ContactUsFrm', 'Contact Us Form').then(text => {
            const firstNameText = text.find('#field_11').text();
            expect(firstNameText).to.contain('First name');

            // Embedded commands (Closure)
            cy.get('#field_11').then(fnText => {
                cy.log(fnText.text());
                cy.log(fnText);
            })
        });

        
    });
});
