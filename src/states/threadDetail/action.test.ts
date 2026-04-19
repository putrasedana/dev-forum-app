/**
 * test scenario for thread detail thunks
 *
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch action correctly when fetch thread detail success
 *   - should dispatch action correctly when fetch thread detail failed
 *
 * - asyncCreateComment thunk
 *   - should dispatch action correctly when create comment success
 *   - should dispatch action correctly when create comment failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Swal from "sweetalert2";
import api from "../../utils/api.js";
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  createCommentActionCreator,
} from "./action.js";

const fakeThreadDetailResponse = {
  id: "thread-1",
  title: "Thread Title",
  body: "Thread body",
  category: "general",
  createdAt: "2023-01-01T00:00:00.000Z",
  ownerId: "user-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  user: {
    id: "user-1",
    name: "User One",
    email: "user1@example.com",
    avatar: "avatar1.jpg",
  },
  owner: {
    id: "user-1",
    name: "User One",
    email: "user1@example.com",
    avatar: "avatar1.jpg",
  },
  comments: [],
};

const fakeCommentResponse = {
  id: "comment-1",
  content: "This is a comment",
  createdAt: "2023-01-01T00:00:00.000Z",
  owner: {
    id: "user-1",
    name: "User One",
    email: "user1@example.com",
    avatar: "avatar1.jpg",
  },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error("Something went wrong");

describe("thread detail thunks", () => {
  beforeEach(() => {
    (api as any)._getDetailThread = api.getDetailThread;
    (api as any)._createComment = api.createComment;
    (window as any)._alert = window.alert;
  });

  afterEach(() => {
    api.getDetailThread = (api as any)._getDetailThread;
    api.createComment = (api as any)._createComment;
    delete (api as any)._getDetailThread;
    delete (api as any)._createComment;

    window.alert = (window as any)._alert;
    delete (window as any)._alert;
  });

  describe("asyncReceiveThreadDetail thunk", () => {
    it("should dispatch action correctly when fetch thread detail success", async () => {
      // arrange
      api.getDetailThread = () => Promise.resolve(fakeThreadDetailResponse);
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreadDetail("thread-1")(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
      expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailResponse));
    });

    it("should dispatch action correctly when fetch thread detail failed", async () => {
      // arrange
      api.getDetailThread = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreadDetail("thread-1")(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          title: fakeErrorResponse.message,
        }),
      );
    });
  });

  describe("asyncCreateComment thunk", () => {
    it("should dispatch action correctly when create comment success", async () => {
      // arrange
      api.createComment = () => Promise.resolve(fakeCommentResponse);
      const dispatch = vi.fn();

      // action
      await asyncCreateComment("thread-1", "This is a comment")(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(createCommentActionCreator(fakeCommentResponse));
    });

    it("should dispatch action correctly when create comment failed", async () => {
      // arrange
      api.createComment = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      // action
      await asyncCreateComment("thread-1", "This is a comment")(dispatch);

      // assert
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          title: fakeErrorResponse.message,
        }),
      );
    });
  });
});
