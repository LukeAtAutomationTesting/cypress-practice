/// <reference types="Cypress" />
describe("Handling data via webdriveruni", () => {
    beforeEach(() => {
      cy.visit("http://webdriveruniversity.com/");
      cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
    })
      it("should calculate and assert the total age of all users", () => {
        const userDetails = []; // tworzenie tablicy
        let totalAgeNumber = 0; // zmienna z sumą wieku
        cy.get('#thumbnail-1 td').each(($el, index, $list) => {
            userDetails[index] = $el.text(); // pobieranie tekst każdego elementu z selektora
        }).then(() => {
            for(let i = 0; i < userDetails.length; i++) { // sprawdzanie pętlą elementów z tablicy
                if (Number(userDetails[i])) { // jeśli element jest liczbą, aktualizowana jest zmienna totalAgeNumber
                    totalAgeNumber += Number(userDetails[i])
                }
                //cy.log(userDetails[i])
            }
            cy.log("Found total age: " + totalAgeNumber) 
            expect(totalAgeNumber).to.eq(322);
        }); 
      });

      it("should calculate and assert the age of a given user based on last name", () => {
        cy.get('#thumbnail-1 tr td:nth-child(2)').each(($el, index, $list) => {
          const text = $el.text();
          if (text.includes('Woods')) {
            cy.get('#thumbnail-1 tr td:nth-child(2)').eq(index).next().then(function (age) { // next przeniesie do komórki obok (w prawo) w tabeli
              const userAge = age.text();
              expect(userAge).to.eq('80');
            })
          }
        })
      });
  });
    