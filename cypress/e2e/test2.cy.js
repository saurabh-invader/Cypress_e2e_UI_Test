describe("Flipkart Mobile Search", () => {
  beforeEach(() => {
    // Visit the URL
    cy.visit("https://www.flipkart.com");
  });

  it("Searches for mobiles and logs names with 36% off", () => {
    // Type "mobiles" in the search box and press Enter
    cy.get('input[name="q"]').type("mobiles").type("{enter}");

    cy.wait(3000);
  });

  it("Searches for mobile and logs name with 36% off", () => {
    cy.get('input[name="q"]').type("mobiles").type("{enter}");

    cy.wait(10000);

    // Find mobiles with 36% off and log their names
    cy.get("._1AtVbE").each((productCard) => {
      const discountPercentage = productCard
        .find("._3Ay6Sb")
        .text()
        .match(/(\d+)% off/);
      cy.log(discountPercentage);
      if (discountPercentage && parseInt(discountPercentage[1]) === 36) {
        const mobileName = productCard.find("._4rR01T").text();
        cy.log(`Mobile with 36% off: ${mobileName}`);
      }
    });
  });

  it.only("Searches mobile and logs name with 4.2 star rating", () => {
    cy.get('input[name="q"]').type("mobiles").type("{enter}");

    cy.wait(10000);

    //Find mobile with 4.2 star rating and log their name
    cy.get("._1AtVbE").each((mobileCard) => {
      const ratingNumber = mobileCard
        .find("._3LWZlK")
        .text()
        .match(/\d\.\d/);
      cy.log(ratingNumber);
      if (ratingNumber == "4.2") {
        const mobileName = mobileCard.find("._4rR01T").text();
        cy.log(`Mobile with 4.2 ratings: ${mobileName}`);
      }
    });
  });
});

//cy.get(".text-element").should("match", /Welcome here|willkommen hier/);
