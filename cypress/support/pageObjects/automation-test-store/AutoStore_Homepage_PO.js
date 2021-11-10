export default class AutoStore_Homepage_PO {
    accessHomepage() {
        cy.visit('https://automationteststore.com/');
    }

    clickOnHairCareLink() {
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click();
    }
}
