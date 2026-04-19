import api, { ThreadDetail, Comment } from "../../utils/api";
import { VotesActionType } from "../votes/action";
import type { AppDispatch } from "../index";
import { showError, showSuccess } from "../../utils/alert";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  CREATE_COMMENT: "CREATE_COMMENT",
  ...VotesActionType,
};

const clearThreadDetail = () => ({ type: ActionType.CLEAR_THREAD_DETAIL });

function receiveThreadDetailActionCreator(threadDetail: ThreadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function createCommentActionCreator(comment: Comment) {
  return { type: ActionType.CREATE_COMMENT, payload: { comment } };
}

function asyncReceiveThreadDetail(threadId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const response = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(response));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

function asyncCreateComment(threadId: string, content: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(createCommentActionCreator(comment));
      showSuccess("Comment posted!");
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  createCommentActionCreator,
  clearThreadDetail,
};
