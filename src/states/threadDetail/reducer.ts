import { ActionType } from "./action.js";
import { ThreadDetail } from "../../utils/api.js";

interface Action {
  type: string;
  payload?: {
    threadDetail?: ThreadDetail;
    userId?: string;
    comment?: import("../../utils/api.js").Comment;
    commentId?: string;
  };
  [extraProps: string]: unknown;
}

function threadDetailReducer(state: ThreadDetail | null = null, action: Action = {} as Action) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload!.threadDetail!;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.UP_VOTE_THREAD:
      if (state) {
        return {
          ...state,
          upVotesBy: [...state.upVotesBy, action.payload!.userId!],
          downVotesBy: state.downVotesBy.filter((userId: string) => userId !== action.payload!.userId),
        };
      }
      return state;

    case ActionType.DOWN_VOTE_THREAD:
      if (state) {
        return {
          ...state,
          downVotesBy: [...state.downVotesBy, action.payload!.userId!],
          upVotesBy: state.upVotesBy.filter((userId: string) => userId !== action.payload!.userId),
        };
      }
      return state;

    case ActionType.NEUTRALIZE_THREAD:
      if (state) {
        return {
          ...state,
          upVotesBy: state.upVotesBy.filter((userId: string) => userId !== action.payload!.userId),
          downVotesBy: state.downVotesBy.filter((userId: string) => userId !== action.payload!.userId),
        };
      }
      return state;

    case ActionType.CREATE_COMMENT:
      if (state) {
        return {
          ...state,
          comments: [action.payload!.comment!, ...state.comments],
        };
      }
      return state;

    case ActionType.UP_VOTE_COMMENT:
      if (state) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.payload!.commentId) {
              return {
                ...comment,
                upVotesBy: [...comment.upVotesBy, action.payload!.userId!],
                downVotesBy: comment.downVotesBy.filter((userId: string) => userId !== action.payload!.userId),
              };
            }
            return comment;
          }),
        };
      }
      return state;

    case ActionType.DOWN_VOTE_COMMENT:
      if (state) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.payload!.commentId) {
              return {
                ...comment,
                downVotesBy: [...comment.downVotesBy, action.payload!.userId!],
                upVotesBy: comment.upVotesBy.filter((userId: string) => userId !== action.payload!.userId),
              };
            }
            return comment;
          }),
        };
      }
      return state;

    case ActionType.NEUTRALIZE_COMMENT:
      if (state) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.payload!.commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.filter((userId: string) => userId !== action.payload!.userId),
                downVotesBy: comment.downVotesBy.filter((userId: string) => userId !== action.payload!.userId),
              };
            }
            return comment;
          }),
        };
      }
      return state;

    default:
      return state;
  }
}

export default threadDetailReducer;
