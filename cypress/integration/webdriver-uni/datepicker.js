/// <reference types="cypress" />

describe("Test Datepicker via webdriveruni", () => {
    it("should select date from the datepicker", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#datepicker').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#datepicker').click();
        // let date = new Date();
        // date.setDate(date.getDate()) // get current date
        // cy.log(date.getDate())

        // let date1 = new Date();
        // date1.setDate(date1.getDate() + 5)
        // cy.log(date1.getDate())

        const date = new Date();
        date.setDate(date.getDate() + 30); // mozemy zmieniac dni do przodu lub do tyłu

        const futureYear = date.getFullYear();
        const futureMonth = date.toLocaleString("en-Us", {month: "long"});
        const futureDay = date.getDate();

        cy.log(futureYear)
        cy.log(futureMonth)
        cy.log(futureDay)

        function selectMonthAndYear() {
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if (!currentDate.text().includes(futureYear)) {
                    cy.get('.next').first().click();
                    selectMonthAndYear();
                }
            }).then(() => {
                cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                    if (!currentDate.text().includes(futureMonth)) {
                        cy.get('.next').first().click();
                        selectMonthAndYear();
                    }
                })
            })
        }

        function selectFutureDay() {
            cy.get('[class="day"').contains(futureDay).click();
        }

        selectMonthAndYear();
        selectFutureDay();
    });
})