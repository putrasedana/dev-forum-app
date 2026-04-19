/**
 * Not Found Page E2E Test
 *
 * Scenarios:
 * - should display 404 page for unknown route
 * - should navigate to homepage when button is clicked
 */

describe("Not Found Page", () => {
  it("should display 404 page for unknown route", () => {
    cy.visit("/this-route-does-not-exist", { failOnStatusCode: false });

    cy.contains("404").should("be.visible");

    cy.contains("Oops! The page you're looking for doesn't exist.").should("be.visible");

    cy.contains("Go to Homepage").should("be.visible").and("have.attr", "href", "/");
  });

  it("should navigate to homepage when button is clicked", () => {
    cy.visit("/another-unknown-route", { failOnStatusCode: false });

    cy.contains("Go to Homepage").click();

    cy.location("pathname").should("eq", "/");

    cy.contains("Dev Forum").should("be.visible");
  });
});
