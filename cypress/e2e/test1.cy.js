describe("Test Ebay feature", () => {
  it("Test Filter feature", () => {
    cy.visit("https://www.ebay.com/");
    cy.get("#gh-shop-a").click();
    cy.get("#gh-sbc-o").trigger("mouseover");
    cy.contains("Cell phones & accessories").click();
    cy.contains("Cell Phones & Smartphones").click();
    cy.contains("See All").click();
    cy.get(".x-overlay__wrapper--left").contains("Screen Size").click();

    cy.get(".x-overlay__wrapper--right")
      .find('[type="checkbox"]')
      .then((checkboxes) => {
        cy.wrap(checkboxes).first().check({ force: true }).should("be.checked");
        cy.wrap(checkboxes).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(checkboxes)
          .contains("6 in or More")
          .check({ force: true })
          .should("be.checked");
      });
    cy.get(".x-overlay-footer__apply").click();
  });
});
