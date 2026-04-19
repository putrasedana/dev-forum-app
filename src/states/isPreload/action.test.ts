/**
 * test scenario for asyncPreloadProcess thunk
 *
 * - asyncPreloadProcess thunk
 *   - should dispatch action correctly when preload success
 *   - should dispatch action correctly when preload failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import api from "../../utils/api.js";
import { asyncPreloadProcess, setIsPreloadActionCreator } from "./action.js";
import { setAuthUserActionCreator } from "../authUser/action.js";

const fakeAuthUser = {
  id: "user-1",
  name: "User Test",
  email: "user@test.com",
  avatar: "avatar.jpg",
};

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncPreloadProcess thunk", () => {
  beforeEach(() => {
    // backup original implementation
    (api as any)._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementation
    api.getOwnProfile = (api as any)._getOwnProfile;
    delete (api as any)._getOwnProfile;
  });

  it("should dispatch action correctly when preload success", async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });

  it("should dispatch action correctly when preload failed", async () => {
    // arrange
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });
});
