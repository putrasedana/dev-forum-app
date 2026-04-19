/**
 * Thread Detail Page - End to End Test
 *
 * Scenarios:
 * - should display thread details and comments
 * - should allow authenticated users to upvote
 * - should allow authenticated users to post a comment
 */

describe("Thread Detail Page", () => {
  const authUser = {
    id: "user-1",
    name: "Auth User",
    email: "auth@example.com",
    avatar: "https://example.com/avatar.png",
  };

  beforeEach(() => {
    cy.intercept("GET", "**/v1/users/me", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          user: authUser,
        },
      },
    }).as("getOwnProfile");

    cy.intercept("GET", "**/v1/threads/thread-1", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          detailThread: {
            id: "thread-1",
            title: "Thread Detail Title",
            body: "Thread body content goes here.",
            category: "general",
            createdAt: "2024-01-10T12:00:00.000Z",
            owner: {
              id: "owner-1",
              name: "Owner One",
              avatar: "https://example.com/avatar1.png",
            },
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 1,
            comments: [
              {
                id: "comment-1",
                content: "Existing comment",
                createdAt: "2024-01-10T13:00:00.000Z",
                owner: {
                  id: "owner-1",
                  name: "Owner One",
                  avatar: "https://example.com/avatar1.png",
                },
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
        },
      },
    }).as("getThreadDetail");

    cy.visit("/threads/thread-1", {
      onBeforeLoad(win) {
        win.localStorage.setItem("accessToken", "test-token");
      },
    });
    cy.wait(["@getOwnProfile", "@getThreadDetail"]);
  });

  it("should display thread details and comments", () => {
    cy.contains("Thread Detail Title").should("be.visible");
    cy.contains("Thread body content goes here.").should("be.visible");
    cy.contains("Owner One").should("be.visible");
    cy.contains("Comment (1)").should("be.visible");
    cy.contains("Existing comment").should("be.visible");
  });

  it("should send an upvote request when the authenticated user clicks upvote", () => {
    cy.intercept("POST", "**/v1/threads/thread-1/up-vote", {
      statusCode: 200,
      body: {
        status: "success",
        data: {
          vote: {
            id: "vote-1",
            userId: authUser.id,
            threadId: "thread-1",
            voteType: 1,
          },
        },
      },
    }).as("upvoteThread");

    cy.get("button").contains(/\d+/).first().click();
    cy.wait("@upvoteThread");
  });

  it("should allow authenticated users to post a comment", () => {
    cy.intercept("POST", "**/v1/threads/thread-1/comments", {
      statusCode: 201,
      body: {
        status: "success",
        data: {
          comment: {
            id: "comment-2",
            content: "A new test comment",
            createdAt: "2024-01-10T14:00:00.000Z",
            owner: authUser,
            upVotesBy: [],
            downVotesBy: [],
          },
        },
      },
    }).as("createComment");

    cy.get("textarea").type("A new test comment");
    cy.get("button").contains("Post Comment").click();

    cy.wait("@createComment");
    cy.contains("A new test comment").should("be.visible");
    cy.contains("Comment (2)").should("be.visible");
  });
});
