/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the isPreload value when given by SET_IS_PRELOAD action
 *
 */

import { describe, it, expect } from "vitest";
import isPreloadReducer from "./reducer.js";
import { ActionType } from "./action.js";

describe("isPreloadReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = true;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the isPreload value when given by SET_IS_PRELOAD action", () => {
    // arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(false);
  });
});
