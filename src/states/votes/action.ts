import { showError } from "../../utils/alert.js";
import api from "../../utils/api.js";
import type { RootState, AppDispatch } from "../index.js";

const VotesActionType = {
  UP_VOTE_COMMENT: "UP_VOTE_COMMENT",
  DOWN_VOTE_COMMENT: "DOWN_VOTE_COMMENT",
  NEUTRALIZE_COMMENT: "NEUTRALIZE_COMMENT",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRALIZE_THREAD: "NEUTRALIZE_THREAD",
} as const;

interface UpVoteThreadAction {
  type: typeof VotesActionType.UP_VOTE_THREAD;
  payload: {
    threadId: string;
    userId: string;
  };
  [extraProps: string]: unknown;
}

interface DownVoteThreadAction {
  type: typeof VotesActionType.DOWN_VOTE_THREAD;
  payload: {
    threadId: string;
    userId: string;
  };
  [extraProps: string]: unknown;
}

interface NeutralizeThreadVoteAction {
  type: typeof VotesActionType.NEUTRALIZE_THREAD;
  payload: {
    threadId: string;
    userId: string;
  };
  [extraProps: string]: unknown;
}

interface UpVoteCommentAction {
  type: typeof VotesActionType.UP_VOTE_COMMENT;
  payload: {
    commentId: string;
    userId: string;
  };
  [extraProps: string]: unknown;
}

interface DownVoteCommentAction {
  type: typeof VotesActionType.DOWN_VOTE_COMMENT;
  payload: {
    commentId: string;
    userId: string;
  };
  [extraProps: string]: unknown;
}

interface NeutralizeCommentVoteAction {
  type: typeof VotesActionType.NEUTRALIZE_COMMENT;
  payload: {
    commentId: string;
    userId: string;
  };
  [extraProps: string]: unknown;
}

type VotesAction =
  | UpVoteThreadAction
  | DownVoteThreadAction
  | NeutralizeThreadVoteAction
  | UpVoteCommentAction
  | DownVoteCommentAction
  | NeutralizeCommentVoteAction;

function upVoteThreadActionCreator(threadId: string, userId: string): UpVoteThreadAction {
  return {
    type: VotesActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator(threadId: string, userId: string): DownVoteThreadAction {
  return {
    type: VotesActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadVoteActionCreator(threadId: string, userId: string): NeutralizeThreadVoteAction {
  return {
    type: VotesActionType.NEUTRALIZE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteCommentActionCreator(commentId: string, userId: string): UpVoteCommentAction {
  return {
    type: VotesActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(commentId: string, userId: string): DownVoteCommentAction {
  return {
    type: VotesActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeCommentVoteActionCreator(commentId: string, userId: string): NeutralizeCommentVoteAction {
  return {
    type: VotesActionType.NEUTRALIZE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncUpVoteThread(threadId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { authUser } = getState();
      await api.upVoteThread(threadId);
      dispatch(upVoteThreadActionCreator(threadId, authUser!.id));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

function asyncDownVoteThread(threadId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { authUser } = getState();
      await api.downVoteThread(threadId);
      dispatch(downVoteThreadActionCreator(threadId, authUser!.id));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

function asyncNeutralizeThreadVote(threadId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { authUser } = getState();
      await api.neutralVoteThread(threadId);
      dispatch(neutralizeThreadVoteActionCreator(threadId, authUser!.id));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

function asyncUpVoteComment(threadId: string, commentId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { authUser } = getState();
      await api.upVoteComment(threadId, commentId);
      dispatch(upVoteCommentActionCreator(commentId, authUser!.id));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

function asyncDownVoteComment(threadId: string, commentId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { authUser } = getState();
      await api.downVoteComment(threadId, commentId);
      dispatch(downVoteCommentActionCreator(commentId, authUser!.id));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

function asyncNeutralizeCommentVote(threadId: string, commentId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { authUser } = getState();
      await api.neutralVoteComment(threadId, commentId);
      dispatch(neutralizeCommentVoteActionCreator(commentId, authUser!.id));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

export {
  VotesActionType,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
};

export type { VotesAction };
