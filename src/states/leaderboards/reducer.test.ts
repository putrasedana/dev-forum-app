/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 *
 */

import { describe, it, expect } from "vitest";
import leaderboardsReducer from "./reducer.js";
import { ActionType } from "./action.js";
import { Leaderboard } from "../../utils/api.js";

describe("leaderboardsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState: Leaderboard[] = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboards when given by RECEIVE_LEADERBOARDS action", () => {
    // arrange
    const initialState: Leaderboard[] = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: "user-1",
              name: "User Test 1",
              email: "user1@example.com",
              avatar: "avatar1.jpg",
            },
            score: 100,
          },
          {
            user: {
              id: "user-2",
              name: "User Test 2",
              email: "user2@example.com",
              avatar: "avatar2.jpg",
            },
            score: 80,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
