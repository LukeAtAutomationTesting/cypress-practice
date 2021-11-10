/// <reference types="cypress" />

describe("Handling iFrame & Modals", () => {
    it("should handle webdriveruni iframe and modal", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#iframe').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        // ponieżej workaround na to, że iframe jest niewidoczny dla Cypressa. Należy pobrać body tego iframe'a i zroć wrap, 
        //tak aby można było później odnieść się do selektorów i używać cypressowych metod (wrap to umożliwia)
        cy.get('#frame').then($iframe => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).as('iframe');
        });

        cy.get('@iframe').find('#button-find-out-more').click();

        cy.get('@iframe').find('#myModal').as('modal');

        cy.get('@modal').should(($expectedText) => {
            const text = $expectedText.text();
            expect(text).to.include('Welcome to webdriveruniversity.com we sell a wide range of electrical goods');
        });

        cy.get('@modal').contains('Close').click();
    });
})