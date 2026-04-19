/**
 * test scenario for asyncPopulateUsersAndThreads thunk
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import Swal from "sweetalert2";
import api from "../../utils/api.js";
import asyncPopulateUsersAndThreads from "./action.js";
import { receiveThreadsActionCreator } from "../threads/action.js";
import { receiveUsersActionCreator } from "../users/action.js";

const fakeUsersResponse = [
  {
    id: "user-1",
    name: "User Test",
    email: "user@test.com",
    avatar: "avatar.jpg",
  },
];

const fakeThreadsResponse = [
  {
    id: "thread-1",
    title: "Thread Test",
    body: "Thread body test",
    category: "general",
    createdAt: "2022-09-22T10:06:55.588Z",
    ownerId: "user-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    user: {
      id: "user-1",
      name: "User Test",
      email: "user@test.com",
      avatar: "avatar.jpg",
    },
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    // backup original implementation
    (api as any)._getAllUsers = api.getAllUsers;
    (api as any)._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllUsers = (api as any)._getAllUsers;
    api.getAllThreads = (api as any)._getAllThreads;

    delete (api as any)._getAllUsers;
    delete (api as any)._getAllThreads;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: fakeErrorResponse.message,
      }),
    );
  });
});
