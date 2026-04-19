/**
 * Register Page - End to End Test
 *
 * Scenarios:
 * - should display register page correctly
 * - should keep user on the page when required fields are missing
 * - should navigate to login after successful registration
 * - should show error when registration fails
 */

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should display register page correctly", () => {
    cy.contains("h2", "Register").should("be.visible");

    cy.get("input#name").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");

    cy.get("button")
      .contains(/^Register$/)
      .should("be.visible");
    cy.contains("Sign in here").should("have.attr", "href", "/login");
  });

  it("should keep the user on register page when required fields are missing", () => {
    cy.get("button")
      .contains(/^Register$/)
      .click();

    cy.location("pathname").should("eq", "/register");
    cy.focused().should("have.id", "name");
  });

  it("should navigate to login after successful registration", () => {
    cy.intercept("POST", "**/v1/register", {
      statusCode: 201,
      body: {
        status: "success",
        data: {
          user: {
            id: "user-1",
            name: "Register User",
            email: "register@example.com",
            avatar: "https://example.com/avatar.png",
          },
        },
      },
    }).as("registerRequest");

    cy.get("input#name").type("Register User");
    cy.get("input#email").type("register@example.com");
    cy.get("input#password").type("password123");

    cy.get("button")
      .contains(/^Register$/)
      .click();

    cy.wait("@registerRequest");
    cy.location("pathname").should("eq", "/login");
  });

  it("should show error when registration fails", () => {
    cy.intercept("POST", "**/v1/register", {
      statusCode: 400,
      body: {
        status: "fail",
        message: "Email already used",
      },
    }).as("registerRequest");

    cy.get("input#name").type("Register User");
    cy.get("input#email").type("register@example.com");
    cy.get("input#password").type("password123");

    cy.get("button")
      .contains(/^Register$/)
      .click();

    cy.wait("@registerRequest");
    cy.get(".swal2-title").should("contain.text", "Email already used");
  });
});
