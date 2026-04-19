/**
 * Login Page - End to End Test
 *
 * Scenarios:
 * - should display login page correctly
 * - should show alert when email is empty
 * - should show alert when password is empty
 * - should show alert when email or password is wrong
 * - should redirect to homepage when login is successful
 */

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login page correctly", () => {
    cy.contains("h2", "Login").should("be.visible");

    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");

    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should keep the user on the login page when email is empty", () => {
    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.location("pathname").should("eq", "/login");
    cy.focused().should("have.id", "email");
  });

  it("should keep the user on the login page when password is empty", () => {
    cy.get("input#email").type("test@email.com");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.location("pathname").should("eq", "/login");
    cy.focused().should("have.id", "password");
  });

  it("should show error when email or password is wrong", () => {
    cy.intercept("POST", "**/v1/login", {
      statusCode: 400,
      body: {
        status: "fail",
        message: "Invalid credentials",
      },
    }).as("loginRequest");

    cy.get("input#email").type("wrong@email.com");
    cy.get("input#password").type("wrongpassword");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.wait("@loginRequest");
    cy.get(".swal2-title").should("contain.text", "Invalid credentials");
  });

  it("should redirect to homepage when login is successful", () => {
    cy.intercept("POST", "**/v1/login", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          token: "test-token",
        },
      },
    }).as("loginRequest");

    cy.intercept("GET", "**/v1/users/me", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          user: {
            id: "user-1",
            name: "Auth User",
            email: "auth@example.com",
            avatar: "https://example.com/avatar.png",
          },
        },
      },
    }).as("meRequest");

    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.get("button").contains("Login").click();

    cy.wait(["@loginRequest", "@meRequest"]);
    cy.contains("Dev Forum").should("be.visible");
    cy.url().should("include", "/");
  });
});
