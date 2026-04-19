/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the up-voted thread when given by UP_VOTE_THREAD action
 *  - should return the threads with the down-voted thread when given by DOWN_VOTE_THREAD action
 *  - should return the threads with neutralized vote when given by NEUTRALIZE_THREAD action
 *
 */

import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer.js";
import { ActionType } from "./action.js";
import { Thread } from "../../utils/api.js";

describe("threadsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState: Thread[] = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by RECEIVE_THREADS action", () => {
    // arrange
    const initialState: Thread[] = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: "thread-1",
            title: "Thread Test 1",
            body: "Body 1",
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
          },
          {
            id: "thread-2",
            title: "Thread Test 2",
            body: "Body 2",
            category: "general",
            createdAt: "2023-01-01T00:00:00.000Z",
            ownerId: "user-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            user: {
              id: "user-2",
              name: "User Two",
              email: "user2@example.com",
              avatar: "avatar2.jpg",
            },
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return the threads with the new thread when given by ADD_THREAD action", () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Test 1",
        body: "Body 1",
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
      },
    ];

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: "thread-2",
          title: "Thread Test 2",
          body: "Body 2",
          category: "general",
          createdAt: "2023-01-01T00:00:00.000Z",
          ownerId: "user-2",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
          user: {
            id: "user-2",
            name: "User Two",
            email: "user2@example.com",
            avatar: "avatar2.jpg",
          },
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it("should return the threads with the up-voted thread when given by UP_VOTE_THREAD action", () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Test 1",
        body: "Body 1",
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
      },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "user-1",
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ["user-1"],
        downVotesBy: [],
      },
    ]);
  });

  it("should return the threads with the down-voted thread when given by DOWN_VOTE_THREAD action", () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Test 1",
        body: "Body 1",
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
      },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "user-1",
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: ["user-1"],
      },
    ]);
  });

  it("should return the threads with neutralized vote when given by NEUTRALIZE_THREAD action", () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Test 1",
        body: "Body 1",
        category: "general",
        createdAt: "2023-01-01T00:00:00.000Z",
        ownerId: "user-1",
        upVotesBy: ["user-1"],
        downVotesBy: [],
        totalComments: 0,
        user: {
          id: "user-1",
          name: "User One",
          email: "user1@example.com",
          avatar: "avatar1.jpg",
        },
      },
    ];

    const action = {
      type: ActionType.NEUTRALIZE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "user-1",
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
