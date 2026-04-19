/**
 * test scenario for asyncCreateThread thunk
 *
 * - asyncCreateThread thunk
 *   - should dispatch action correctly when create thread success
 *   - should dispatch action correctly when create thread failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Swal from "sweetalert2";
import api from "../../utils/api.js";
import { asyncCreateThread, createThreadActionCreator } from "./action.js";

const fakeThreadResponse = {
  id: "thread-1",
  title: "Thread Title",
  body: "Thread body",
  category: "general",
  ownerId: "user-1",
  createdAt: "2023-01-01T00:00:00.000Z",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  user: {
    id: "user-1",
    name: "User Test",
    email: "user@test.com",
    avatar: "avatar.jpg",
  },
};

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncCreateThread thunk", () => {
  beforeEach(() => {
    (api as any)._createThread = api.createThread;
    (window as any)._alert = window.alert;
  });

  afterEach(() => {
    api.createThread = (api as any)._createThread;
    delete (api as any)._createThread;

    window.alert = (window as any)._alert;
    delete (window as any)._alert;
  });

  it("should dispatch action correctly when create thread success", async () => {
    // arrange
    api.createThread = vi.fn(() => Promise.resolve(fakeThreadResponse));
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({
      title: "Thread Title",
      body: "Thread body",
      category: "general",
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(createThreadActionCreator(fakeThreadResponse));
  });

  it("should dispatch action correctly when create thread failed", async () => {
    // arrange
    api.createThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({
      title: "Thread Title",
      body: "Thread body",
      category: "general",
    })(dispatch);

    // assert
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: fakeErrorResponse.message,
      }),
    );
  });
});
