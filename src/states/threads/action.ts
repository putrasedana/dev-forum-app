import api, { Thread } from "../../utils/api";
import type { AppDispatch } from "../index";
import { showError, showSuccess } from "../../utils/alert";

const ActionType = {
  ADD_THREAD: "ADD_THREAD",
  RECEIVE_THREADS: "RECEIVE_THREADS",
  CREATE_THREAD: "CREATE_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRALIZE_THREAD: "NEUTRALIZE_THREAD",
};

function receiveThreadsActionCreator(threads: Thread[]) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function createThreadActionCreator(thread: Thread) {
  return { type: ActionType.CREATE_THREAD, payload: { thread } };
}

function asyncCreateThread({ title, body, category }: { title: string; body: string; category: string }) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(response));
      showSuccess("Thread created!");
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

export { ActionType, receiveThreadsActionCreator, createThreadActionCreator, asyncCreateThread };
