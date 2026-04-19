/**
 * New Thread Page - End to End Test
 *
 * Scenarios:
 * - should prevent unauthenticated users from creating a thread
 * - should allow authenticated users to create a thread
 * - should validate required fields before submit
 */

describe("New Thread Page", () => {
  it("should prevent unauthenticated users from creating a thread", () => {
    cy.intercept("GET", "**/v1/users/me", {
      statusCode: 401,
      body: {
        status: "fail",
        message: "Unauthenticated",
      },
    }).as("getOwnProfile");

    cy.visit("/new");
    cy.wait("@getOwnProfile");

    cy.get("input#title").type("Unauthorized thread");
    cy.get("input#category").type("testing");
    cy.get("textarea#body").type("This should not be created.");

    cy.get("button").contains("Create Thread").click();
    cy.get(".swal2-title").should("contain.text", "You need to log in first to create a thread.");
    cy.location("pathname").should("eq", "/new");
  });

  it("should allow authenticated users to create a thread", () => {
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
    }).as("getOwnProfile");

    cy.intercept("POST", "**/v1/threads", {
      statusCode: 201,
      body: {
        status: "success",
        data: {
          thread: {
            id: "thread-new",
            title: "New thread created",
            body: "New thread body.",
            category: "testing",
            createdAt: "2024-01-15T12:00:00.000Z",
            ownerId: "user-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        },
      },
    }).as("createThread");

    cy.visit("/new", {
      onBeforeLoad(win) {
        win.localStorage.setItem("accessToken", "test-token");
      },
    });
    cy.wait("@getOwnProfile");

    cy.get("input#title").type("New thread created");
    cy.get("input#category").type("testing");
    cy.get("textarea#body").type("New thread body.");

    cy.get("button").contains("Create Thread").click();
    cy.wait("@createThread");

    cy.location("pathname").should("eq", "/");
    cy.contains("Recent Threads").should("be.visible");
  });

  it("should validate required fields before submitting", () => {
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
    }).as("getOwnProfile");

    cy.visit("/new", {
      onBeforeLoad(win) {
        win.localStorage.setItem("accessToken", "test-token");
      },
    });
    cy.wait("@getOwnProfile");

    cy.get("button").contains("Create Thread").click();

    cy.location("pathname").should("eq", "/new");
    cy.focused().should("have.id", "title");
  });
});
