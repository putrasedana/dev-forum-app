/**
 * test scenario for asyncFetchLeaderboards thunk
 *
 * - asyncFetchLeaderboards thunk
 *   - should dispatch action correctly when fetch leaderboards success
 *   - should dispatch action correctly when fetch leaderboards failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import Swal from "sweetalert2";
import api from "../../utils/api.js";
import { asyncFetchLeaderboards, receiveLeaderboardsActionCreator } from "./action.js";

const fakeLeaderboardsResponse = [
  {
    user: {
      id: "user-1",
      name: "User One",
      email: "user1@example.com",
      avatar: "avatar1.jpg",
    },
    score: 100,
  },
  {
    user: {
      id: "user-2",
      name: "User Two",
      email: "user2@example.com",
      avatar: "avatar2.jpg",
    },
    score: 90,
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncFetchLeaderboards thunk", () => {
  beforeEach(() => {
    // backup original implementations
    (api as any)._getLeaderboards = api.getLeaderboards;
    (window as any)._alert = window.alert;
  });

  afterEach(() => {
    // restore original implementations
    api.getLeaderboards = (api as any)._getLeaderboards;
    delete (api as any)._getLeaderboards;

    window.alert = (window as any)._alert;
    delete (window as any)._alert;
  });

  it("should dispatch action correctly when fetch leaderboards success", async () => {
    // arrange
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse));
  });

  it("should dispatch action correctly when fetch leaderboards failed", async () => {
    // arrange
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: fakeErrorResponse.message,
      }),
    );
  });
});
