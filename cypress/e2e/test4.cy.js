describe("Home Page", () => {
  it("User is able to login into Amazon", () => {
    cy.visit("https://amazon.in");
    cy.get("#nav-link-accountList > .nav-line-2").trigger("mouseover");
    cy.contains("Sign in").click();

    cy.get("#ap_email").type("saurabhprofs@gmail.com");
    cy.get(".a-button-inner > #continue").click();
    cy.wait(5000);
    cy.get(".a-spacing-base > span").should("exist");
    cy.get("#ap_password").type("Pass@134");
    cy.get("#signInSubmit").click();
    cy.get(".a-alert-heading").should("not.exist");
  });
});
