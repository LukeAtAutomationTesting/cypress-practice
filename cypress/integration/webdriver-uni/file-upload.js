/// <reference types="cypress" />

describe("Test File Upload for webdriveruni", () => {
    it("should upload a file", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#file-upload').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.fixture('laptop.png', 'base64').then(fileContent => {
            cy.get('#myFile').attachFile(
                {
                    fileContent,
                    fileName: 'laptop.png',
                    mimeType: 'image/png'
                }, 
                {
                    uploadType: 'input'
                }
            )
        });

        cy.get('#submit-button').click()
    });

    it("should upload no file", () => {
        cy.visit('http://www.webdriveruniversity.com');
        cy.get('#file-upload').invoke('removeAttr', 'target').click({force: true}) // workaround to do not open a new tab

        cy.get('#submit-button').click()
    });
})