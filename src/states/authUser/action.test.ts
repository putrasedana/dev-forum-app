/**
 * test scenario for authUser thunks
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when login success
 *   - should dispatch action and call alert correctly when login failed
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch action correctly when logout
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import Swal from "sweetalert2";
import api from "../../utils/api.js";
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from "./action.js";

const fakeAuthUser = {
  id: "user-1",
  name: "User Test",
  email: "user@test.com",
  avatar: "avatar.jpg",
};

const fakeToken = "fake-token";
const fakeErrorResponse = new Error("Ups, something went wrong");

describe("authUser thunks", () => {
  beforeEach(() => {
    // backup original implementations
    (api as any)._login = api.login;
    (api as any)._putAccessToken = api.putAccessToken;
    (api as any)._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementations
    api.login = (api as any)._login;
    api.putAccessToken = (api as any)._putAccessToken;
    api.getOwnProfile = (api as any)._getOwnProfile;

    delete (api as any)._login;
    delete (api as any)._putAccessToken;
    delete (api as any)._getOwnProfile;
  });

  describe("asyncSetAuthUser thunk", () => {
    it("should dispatch action correctly when login success", async () => {
      // arrange
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

      const dispatch = vi.fn();

      // action
      const result = await asyncSetAuthUser({
        email: "user@test.com",
        password: "password",
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(result).toEqual({
        success: true,
        user: fakeAuthUser,
      });
    });

    it("should dispatch action and call alert correctly when login failed", async () => {
      // arrange
      api.login = () => Promise.reject(fakeErrorResponse);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = vi.fn();

      const dispatch = vi.fn();

      // action
      await expect(
        asyncSetAuthUser({
          email: "user@test.com",
          password: "password",
        })(dispatch),
      ).rejects.toThrow(fakeErrorResponse);

      // assert
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          title: fakeErrorResponse.message,
        }),
      );
    });
  });

  describe("asyncUnsetAuthUser thunk", () => {
    it("should dispatch action correctly when logout", () => {
      // arrange
      api.putAccessToken = vi.fn();
      const dispatch = vi.fn();

      // action
      asyncUnsetAuthUser()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith("");
    });
  });
});
