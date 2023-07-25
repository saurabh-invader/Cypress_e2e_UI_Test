/// <reference types="cypress"/>

describe("our first suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by tag name
    cy.get("input");

    //by ID
    cy.get("#inputEmail1");

    //by class
    cy.get(".input-full-width");

    //by attribute
    cy.get("[placeholder]");

    //by attribute and value
    cy.get('[placeholder="Email"]');

    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different attribute
    cy.get('[placeholder="Email"][id="inputEmail1"]');

    //by tag name and attribute with value, ID and class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //most imp one
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputEmail1"]')
    //   .should("contain", "Email address");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();

        expect(passwordLabelFirst).to.equal(passwordLabelSecond);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
        cy.wrap(secondForm)
          .find('[for="exampleInputEmail1"]')
          .should("contain", "Email address");
      });
    });
  });

  it("Invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.get('[for="exampleInputEmail1"]').then((label) => {
    //   expect(label.text()).to.equal("Email address");
    // });

    // cy.get('[for="exampleInputEmail1"]')
    //   .invoke("text")
    //   .then((text) => {
    //     expect(text).to.equal("Email address");
    //   });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      //.should("contain", "checked");
      .then((value) => {
        expect(value).to.contain("checked");
      });
  });

  it("assert property with invoke", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("17").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Apr 17, 2023");
      });
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButton) => {
        cy.wrap(radioButton)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButton).eq(1).check({ force: true }).should("be.checked");

        cy.wrap(radioButton).first().should("not.be.checked");
        cy.wrap(radioButton).last().should("be.disabled");
      });
  });

  it("assert property with dynamic dates", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString("default", {
        month: "short",
      });
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();
      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get("nb-calendar-day-picker [class='day-cell ng-star-inserted']")
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(40);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });

    // cy.contains("nb-card", "Common Datepicker").find("input").then((input) => {
    //     cy.wrap(input).click();
    //     cy.get("nb-calendar-day-picker").contains("17").click();
    //     cy.wrap(input).invoke("prop", "value").should("contain", "Apr 17, 2023");
    //   });
  });

  it.only("Web Table", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // cy.get("tbody")
    //   .contains("tr", "Larry")
    //   .then((tableRow) => {
    //     cy.wrap(tableRow).find(".nb-edit").click();
    //     cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(25);
    //     cy.wrap(tableRow).find(".nb-checkmark").click();
    //     cy.wrap(tableRow).find("td").last().should("contain", "25");

    // cy.get("tbody")
    //   .contains("tr", "Larry")
    //   .then((tableRow) => {
    //     cy.wrap(tableRow).find(".nb-edit").click();
    //     cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
    //     cy.wrap(tableRow).find(".nb-checkmark").click();
    //     cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
    //   });

    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Saurabh");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Singh");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    //cy.get("tbody tr").first().find("td").eq(2).should("contain", "Saurabh");
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumn) => {
        cy.wrap(tableColumn).eq(2).should("contain", "Saurabh");
        cy.wrap(tableColumn).eq(3).should("contain", "Singh ");
      });
  });
});

it("Web Table", () => {
  cy.visit("/");
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  //1
  // cy.get("tbody tr").first().find(".nb-trash").click();
  // cy.on("window:confirm", (confirm) => {
  //   expect(confirm).to.equal("Are you sure you want to delete?");
  // });

  //2
  // const stub = cy.stub();
  // cy.on("window:confirm", stub);
  // cy.get("tbody tr")
  //   .first()
  //   .find(".nb-trash")
  //   .click()
  //   .then(() => {
  //     expect(stub.getCall(0)).to.be.calledWith(
  //       "Are you sure you want to delete?"
  //     );
  //   });

  //3
  // cy.get("tbody tr").first().find(".nb-trash").click();
  // cy.on("window:confirm", () => false);
});
