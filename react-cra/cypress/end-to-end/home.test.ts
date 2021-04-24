import faker from "faker";

describe("Home", () => {
  const { baseUrl } = Cypress.config();

  it("Can register a user", () => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    cy.visit("/");
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByText(/sign up/i).click();

    cy.url().should("equal", `${baseUrl}/todos`);
    cy.findByText(`${user.username}'s Todos`).should("exist");
  });

  it("Can logout a user", () => {
    // Verify that this test occurs after a login
    cy.url().should("equal", `${baseUrl}/todos`);

    // Verify that we see the page for logged in users
    cy.findByText("Home").click();
    cy.url().should("equal", `${baseUrl}/`);
    cy.findByText(/sign up/i).should("not.exist");
    cy.findByText(/sign in/i).should("not.exist");

    // Verify that we can logout and see the page for guests
    cy.findByText(/logout/i).click();
    cy.findByText(/sign up/i).should("exist");
    cy.findByText(/sign in/i).should("exist");
  });

  it("Prevents duplicate registration", () => {
    const errorText = "Username already exists.";

    cy.visit("/");
    cy.createUser().then((user) => {
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByText(/sign up/i).click();

      // URL didn't change
      cy.url().should("equal", `${Cypress.config().baseUrl}/`);

      // Error notification
      cy.findByText(errorText).should("exist");
      cy.wait(5000);
      cy.findByText(errorText).should("not.exist");
    });
  });

  it("Can login an existing user", () => {
    cy.visit("/");
    cy.createUser().then((user) => {
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByText(/sign in/i).click();

      cy.url().should("equal", `${baseUrl}/todos`);
      cy.findByText(`${user.username}'s Todos`).should("exist");
    });
  });

  it("Prevents invalid logins", () => {
    const errorText = "Invalid username or password.";

    cy.visit("/");
    cy.createUser().then((user) => {
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(`${user.password}-wrong-characters`);
      cy.findByText(/sign in/i).click();

      // URL didn't change`
      cy.url().should("equal", `${baseUrl}/`);

      // Error notification
      cy.findByText(errorText).should("exist");
      cy.wait(5000);
      cy.findByText(errorText).should("not.exist");
    });
  });
});
