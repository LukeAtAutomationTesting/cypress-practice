/// <reference types="Cypress" />

describe('Alias and invoke', () => {
    it('should validate a specific hair care product', () => {
        cy.visit('https://automationteststore.com/');
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click();
        
        cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnail');
        cy.get('@productThumbnail').its('length').should('be.greaterThan', 5);
        cy.get('@productThumbnail').should('include', 'Seaweed Conditioner')
    });

    it('should validate product thumbnail', () => {
        cy.visit('https://automationteststore.com/');

        cy.get('.thumbnail').as('productThumbnail');
        cy.get('@productThumbnail').should('have.length', 16);
        cy.get('@productThumbnail').find('.productcart').invoke('attr', 'title').should('include', 'Add to Cart')
    });

    it('should calculate total of normal and sale products', () => {
        cy.visit('https://automationteststore.com/');

        cy.get('.thumbnail').as('productThumbnail');
        // cy.get('@productThumbnail').find('.oneprice').each(($el, index, $list) => {
        //     cy.log($el.text());
        // });

        cy.get('.thumbnail').find('.oneprice').invoke('text').as('itemPrice');
        cy.get('.thumbnail').find('.pricenew').invoke('text').as('saleItemPrice');
        
        let itemsTotal = 0;

        // Non sale price total
        cy.get('@itemPrice').then($linkText => {
            let itemPriceTotal = 0;

            const itemPrice = $linkText.split('$');
            for (let i = 0; i < itemPrice.length; i++) {
                itemPriceTotal += Number(itemPrice[i])
            }

            itemsTotal += itemPriceTotal;
            cy.log('Non sale price items total: ' + itemPriceTotal)
        })

        // Sale price total
        cy.get('@saleItemPrice').then($linkText => {
            let saleItemPriceTotal = 0;

            const saleItemPrice = $linkText.split('$');
            for (let i = 0; i < saleItemPrice.length; i++) {
                saleItemPriceTotal += Number(saleItemPrice[i])
            }

            itemsTotal += saleItemPriceTotal;
            cy.log('Sale price items total: ' + saleItemPriceTotal)
        })
        .then(() => {
            cy.log(`The total price of all products: ${itemsTotal}`)
            expect(itemsTotal).to.equal(654.1);
        })
    });
});
