/// <reference types="Cypress" />

describe('Iterate over elements', () => {
    beforeEach(function() {
        cy.visit('https://automationteststore.com/');
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click();
    });

    it('Log information of all hair care products', () => {
        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            cy.log('Index: ' + index + ' : ' + $el.text())
        })
    });

    it('Add specific product to basket', () => {
        // cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
        //     if ($el.text().includes('Curls to straight Shampoo')) {
        //         cy.wrap($el).click()
        //     }
        // })       // zakomentowany kod to metoda poniżej, która została stworzona w folderze support - plik commands.js

        cy.selectProduct('Curls to straight Shampoo');
    });

    it('Add another specific product to basket', () => {
        cy.selectProduct('Seaweed Conditioner');
    });

    it('Add second product to basket', () => {
        cy.selectProduct('Eau Parfumee au The Vert Shampoo');
    });
});
