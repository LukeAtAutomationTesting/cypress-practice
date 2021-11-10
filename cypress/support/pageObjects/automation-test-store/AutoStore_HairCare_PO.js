export default class AutoStore_HairCare_PO {
    addHairCareProductToBasket() {
        globalThis.data.productName.forEach(function (element) {
            cy.addProductToBasket(element).then(() => {
                //debugger
            });
        });
        //cy.get('.dropdown-toggle > .fa').click().debug();   // debugowanie
        cy.get('.dropdown-toggle > .fa').click();
    }
}