/// <reference types="cypress" />

describe("Test mouse actions", () => {
    it("should scroll element into view", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab
    });

    it("should be able to drag and drop a draggable item", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#draggable').trigger('mousedown', {which: 1});
        cy.get('#droppable').trigger('mousemove').trigger('mouseup', {force: true})
    });

    it("should be able to perform a double mouse click", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#double-click').dblclick().should('have.class', 'double');
    });

    it("should be able to hold down the left mouse click button on the given element", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#click-box').trigger('mousedown', {which: 1}).then(($element) => {
            cy.get($element).should('have.css', 'background-color', 'rgb(0, 255, 0)');
            // or
            expect($element).to.have.css('background-color', 'rgb(0, 255, 0)');
        });
    });
});