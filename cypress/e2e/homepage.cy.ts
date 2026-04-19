/**
 * Homepage - End to End Test
 *
 * Scenarios:
 * - should display recent threads and categories
 * - should filter threads by selected category
 */

describe("Homepage", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);

    cy.intercept("GET", "**/v1/users/me", {
      statusCode: 401,
      body: {
        status: "fail",
        message: "Unauthenticated",
      },
    }).as("getOwnProfile");

    cy.intercept("GET", "**/v1/users", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          users: [
            {
              id: "owner-1",
              name: "Owner One",
              email: "owner1@example.com",
              avatar: "https://example.com/avatar1.png",
            },
          ],
        },
      },
    }).as("getUsers");

    cy.intercept("GET", "**/v1/threads", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          threads: [
            {
              id: "thread-1",
              title: "First Thread",
              body: "First thread body content.",
              category: "general",
              createdAt: "2024-01-01T00:00:00.000Z",
              ownerId: "owner-1",
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 2,
            },
            {
              id: "thread-2",
              title: "Second Thread",
              body: "Second thread body content.",
              category: "news",
              createdAt: "2024-01-02T00:00:00.000Z",
              ownerId: "owner-1",
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 1,
            },
          ],
        },
      },
    }).as("getThreads");

    cy.intercept("GET", "**/v1/users/me", {
      statusCode: 401,
      body: {
        status: "fail",
        message: "Unauthenticated",
      },
    }).as("getOwnProfile");

    cy.visit("/");
    cy.wait(["@getOwnProfile", "@getUsers", "@getThreads"]);
  });

  it("should display recent threads and available categories", () => {
    cy.contains("Recent Threads").should("be.visible");

    cy.contains("First Thread").should("be.visible");
    cy.contains("Second Thread").should("be.visible");

    cy.contains("#general").should("be.visible");
    cy.contains("#news").should("be.visible");
  });

  it("should filter threads when a category is selected", () => {
    cy.contains("button", "#news").should("be.visible").click();

    cy.get("[data-testid='thread-item']").should("have.length", 1);
    cy.contains("h3", "Second Thread").should("be.visible");
    cy.contains("h3", "First Thread").should("not.exist");
  });
});
