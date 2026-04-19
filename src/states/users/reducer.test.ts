/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the users when given by RECEIVE_USERS action
 *
 */

import { describe, it, expect } from "vitest";
import usersReducer from "./reducer.js";
import { ActionType } from "./action.js";
import { User } from "../../utils/api.js";

describe("usersReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState: User[] = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the users when given by RECEIVE_USERS action", () => {
    // arrange
    const initialState: User[] = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          {
            id: "user-1",
            name: "User Test 1",
            email: "user1@test.com",
            avatar: "avatar1.jpg",
          },
          {
            id: "user-2",
            name: "User Test 2",
            email: "user2@test.com",
            avatar: "avatar2.jpg",
          },
        ],
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
