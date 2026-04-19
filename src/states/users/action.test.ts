/**
 * test scenarios for asyncRegisterUser thunk
 *
 * - should call api.register correctly when success
 * - should call alert correctly when register failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Swal from "sweetalert2";
import api from "../../utils/api.js";
import { asyncRegisterUser } from "./action.js";

const fakeRegisterPayload = {
  name: "User Test",
  email: "user@test.com",
  password: "password123",
};

const fakeErrorResponse = new Error("Register failed");

describe("asyncRegisterUser thunk", () => {
  beforeEach(() => {
    (api as any)._register = api.register;
    (window as any)._alert = window.alert;
  });

  afterEach(() => {
    api.register = (api as any)._register;
    delete (api as any)._register;

    window.alert = (window as any)._alert;
    delete (window as any)._alert;
  });

  it("should call api.register correctly when success", async () => {
    // arrange
    api.register = vi.fn(() => Promise.resolve({} as any));

    // action
    await asyncRegisterUser(fakeRegisterPayload)();

    // assert
    expect(api.register).toHaveBeenCalledWith(fakeRegisterPayload);
  });

  it("should call alert correctly when register failed", async () => {
    // arrange
    api.register = vi.fn(() => Promise.reject(fakeErrorResponse));

    // action and assert
    await expect(asyncRegisterUser(fakeRegisterPayload)()).rejects.toThrow("Register failed");

    // assert alert was called
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: fakeErrorResponse.message,
      }),
    );
  });
});
