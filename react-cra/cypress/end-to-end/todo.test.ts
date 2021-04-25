import faker from "faker";

describe("Todos", () => {
  const { baseUrl } = Cypress.config();

  before(() => {
    cy.createUser().then((createdUser) => {
      cy.visit("/");
      cy.findByLabelText(/username/i).type(createdUser.username);
      cy.findByLabelText(/password/i).type(createdUser.password);
      cy.findByText(/sign in/i).click();
      cy.url().should("equal", `${baseUrl}/todos`);
    });
  });

  it("Can create and delete todos for a user", () => {
    const todo = faker.lorem.sentence();

    cy.findByLabelText(/add todo/i).type(todo);
    cy.findByText("add").click();

    cy.findByText(todo).should("exist");
    cy.findByLabelText(/add todo/i).should("have.value", "");

    cy.findByText("×").click();
    cy.findByText(todo).should("not.exist");
  });
});
