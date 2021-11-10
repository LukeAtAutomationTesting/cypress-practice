/// <reference types="Cypress" />

describe('Test Contact Us form via Automation Test Store', () => {
    before(function() {
        // cy.viewport(550, 750); // niestandardowy rozmiar okna
        cy.fixture("userDetails").as("user");
    });

    it('Should be able to submit a successful submissionvia contact us form', () => {
        cy.visit('https://automationteststore.com/');
        cy.get("a[href$='contact']555").click().then(function(itemText) {
            cy.log(`Button text is: ${itemText.text()}`)
        })
       
        //cy.get('.info_links_footer > :nth-child(5) > a').click();
        // cy.xpath("//a[contains(@href, 'contact')]").click();

        cy.get('@user').then((user) => {
            cy.get('#ContactUsFrm_first_name').type(user.first_name);
            cy.get('#ContactUsFrm_email').type(user.email);
        })
        
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email');
        cy.get('#ContactUsFrm_enquiry').type('Do you have any discouts on a Calvin Klein perfume?');
        cy.get("button[title='Submit']").click();
        cy.get('.mb40 > :nth-child(3)').should('be.visible', 'Your enquiry has been successfully sent to the store owner!');
        cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
    });
});