describe("Search book", () => {
  it("User is able to add book into Cart", () => {
    cy.visit("https://amazon.in");
    cy.wait(5000);
    cy.get("#twotabsearchtextbox").type("Steve Jobs Book");
    cy.get(":nth-child(1) > .s-suggestion-container > .s-suggestion").click();
    //cy.contains("steve jobs book in hindi").click()
    cy.contains("STEVE JOBS (PB): THE EXCLUSIVE BIOGRAPHY")
      .invoke("removeAttr", "target")
      .click();
    cy.get("#productTitle")
      .should("exist")
      .contains("STEVE JOBS (PB): THE EXCLUSIVE BIOGRAPHY");
    cy.get("#quantity").select("2");
    cy.get("#add-to-cart-button").click();
    cy.get(".a-size-medium-plus").should("exist").contains("Added to Cart");
    cy.get("#nav-cart-count").click();
    cy.get("h1").should("exist").contains("Shopping Cart");
  });

  it.only("Login into Amazon", () => {
    cy.visit("https://www.amazon.in/");
    cy.contains("Hello, sign in").click();
    cy.get('[name="email"]').type("xyz@gmail.com");
    cy.get(".a-button-inner").click();
    cy.get('[name="password"]').type("password");
    cy.get("#signInSubmit").click();
    cy.get(".title").should("contain", "Amazon");
  });
});
