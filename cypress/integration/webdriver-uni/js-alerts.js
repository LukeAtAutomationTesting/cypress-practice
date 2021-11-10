/// <reference types="cypress" />

describe("Handle JavaScript alerts", () => {
    it("should confirm JS alert contains the correct text", () => {
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#button1').click();

        cy.on('window:alert', (str) => {
            expect(str).to.eq('I am an alert box!');
        });
    });

    it("should validate JS confirm alert box works correctly when clicking ok", () => {
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#button4').click();

        cy.on('window:confirm', () => {
            return true;
        });

        cy.get('#confirm-alert-text').contains('You pressed OK!')
    });

    it("should validate JS confirm alert box works correctly when clicking cancel", () => {
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#button4').click();

        cy.on('window:confirm', () => {
            return false;
        });

        cy.get('#confirm-alert-text').contains('You pressed Cancel!')
    });

    it("should validate JS confirm alert box using a stub", () => {
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        const stub = cy.stub();  // służy jako storage do eventu, w tym przypadku windows:confirm
        cy.on('window:confirm', stub);

        cy.get('#button4').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!'); //getCall z indexem 0 pobiera wynik tego eventu. Zero, ponieważ tylko jeden event został wywołany
        }).then(() => {
            return true;  // promis upewniający sie, że zostanie kliknięty button OK na alercie
        }).then(() => {
            cy.get('#confirm-alert-text').contains('You pressed OK!'); // promis sprawdzajacy tekst ze statusem
        })
    });
})