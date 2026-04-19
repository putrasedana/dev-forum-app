import { ActionType } from "./action.js";
import { Thread } from "../../utils/api.js";

interface Action {
  type: string;
  payload?: {
    threads?: Thread[];
    thread?: Thread;
    threadId?: string;
    userId?: string;
  };
  [extraProps: string]: unknown;
}

function threadsReducer(threads: Thread[] = [], action: Action = {} as Action) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload!.threads!;

    case ActionType.ADD_THREAD:
      return [action.payload!.thread!, ...threads];

    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload!.threadId) {
          return {
            ...thread,
            upVotesBy: [...thread.upVotesBy, action.payload!.userId!],
            downVotesBy: thread.downVotesBy.filter((userId: string) => userId !== action.payload!.userId),
          };
        }
        return thread;
      });

    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload!.threadId) {
          return {
            ...thread,
            downVotesBy: [...thread.downVotesBy, action.payload!.userId!],
            upVotesBy: thread.upVotesBy.filter((userId: string) => userId !== action.payload!.userId),
          };
        }
        return thread;
      });

    case ActionType.NEUTRALIZE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload!.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((userId: string) => userId !== action.payload!.userId),
            downVotesBy: thread.downVotesBy.filter((userId: string) => userId !== action.payload!.userId),
          };
        }
        return thread;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
