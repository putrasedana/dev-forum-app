/**
 * test scenarios for votes thunk functions
 *
 * - asyncUpVoteThread
 * - asyncDownVoteThread
 * - asyncNeutralizeThreadVote
 * - asyncUpVoteComment
 * - asyncDownVoteComment
 * - asyncNeutralizeCommentVote
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Swal from "sweetalert2";
import api, { User } from "../../utils/api.js";
import type { RootState } from "../index.js";
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
} from "./action.js";

const fakeAuthUser: User = {
  id: "user-1",
  name: "User Test",
  email: "user@example.com",
  avatar: "avatar.jpg",
};

const fakeErrorResponse = new Error("Something went wrong");

const getState = (): Pick<RootState, "authUser"> => ({
  authUser: fakeAuthUser,
});

describe("votes thunk functions", () => {
  beforeEach(() => {
    (api as any)._upVoteThread = api.upVoteThread;
    (api as any)._downVoteThread = api.downVoteThread;
    (api as any)._neutralVoteThread = api.neutralVoteThread;
    (api as any)._upVoteComment = api.upVoteComment;
    (api as any)._downVoteComment = api.downVoteComment;
    (api as any)._neutralVoteComment = api.neutralVoteComment;

    (window as any)._alert = window.alert;
  });

  afterEach(() => {
    api.upVoteThread = (api as any)._upVoteThread;
    api.downVoteThread = (api as any)._downVoteThread;
    api.neutralVoteThread = (api as any)._neutralVoteThread;
    api.upVoteComment = (api as any)._upVoteComment;
    api.downVoteComment = (api as any)._downVoteComment;
    api.neutralVoteComment = (api as any)._neutralVoteComment;

    delete (api as any)._upVoteThread;
    delete (api as any)._downVoteThread;
    delete (api as any)._neutralVoteThread;
    delete (api as any)._upVoteComment;
    delete (api as any)._downVoteComment;
    delete (api as any)._neutralVoteComment;

    window.alert = (window as any)._alert;
    delete (window as any)._alert;
  });

  it("should dispatch action correctly when asyncUpVoteThread success", async () => {
    api.upVoteThread = vi.fn(() => Promise.resolve({} as any));
    const dispatch = vi.fn();

    await asyncUpVoteThread("thread-1")(dispatch, getState as any);

    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator("thread-1", fakeAuthUser.id));
  });

  it("should call alert correctly when asyncUpVoteThread failed", async () => {
    api.upVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();

    await asyncUpVoteThread("thread-1")(dispatch, getState as any);

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: fakeErrorResponse.message,
      }),
    );
  });

  it("should dispatch action correctly when asyncDownVoteThread success", async () => {
    api.downVoteThread = vi.fn(() => Promise.resolve({} as any));
    const dispatch = vi.fn();

    await asyncDownVoteThread("thread-1")(dispatch, getState as any);

    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator("thread-1", fakeAuthUser.id));
  });

  it("should dispatch action correctly when asyncNeutralizeThreadVote success", async () => {
    api.neutralVoteThread = vi.fn(() => Promise.resolve({} as any));
    const dispatch = vi.fn();

    await asyncNeutralizeThreadVote("thread-1")(dispatch, getState as any);

    expect(dispatch).toHaveBeenCalledWith(neutralizeThreadVoteActionCreator("thread-1", fakeAuthUser.id));
  });

  it("should dispatch action correctly when asyncUpVoteComment success", async () => {
    api.upVoteComment = vi.fn(() => Promise.resolve({} as any));
    const dispatch = vi.fn();

    await asyncUpVoteComment("thread-1", "comment-1")(dispatch, getState as any);

    expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator("comment-1", fakeAuthUser.id));
  });

  it("should dispatch action correctly when asyncDownVoteComment success", async () => {
    api.downVoteComment = vi.fn(() => Promise.resolve({} as any));
    const dispatch = vi.fn();

    await asyncDownVoteComment("thread-1", "comment-1")(dispatch, getState as any);

    expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator("comment-1", fakeAuthUser.id));
  });

  it("should dispatch action correctly when asyncNeutralizeCommentVote success", async () => {
    api.neutralVoteComment = vi.fn(() => Promise.resolve({} as any));
    const dispatch = vi.fn();

    await asyncNeutralizeCommentVote("thread-1", "comment-1")(dispatch, getState as any);

    expect(dispatch).toHaveBeenCalledWith(neutralizeCommentVoteActionCreator("comment-1", fakeAuthUser.id));
  });
});
