import api from "../../utils/api.js";
import { receiveThreadsActionCreator } from "../threads/action.js";
import { receiveUsersActionCreator } from "../users/action.js";
import type { AppDispatch } from "../index.js";
import { showError } from "../../utils/alert.js";

function asyncPopulateUsersAndThreads() {
  return async (dispatch: AppDispatch) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

export default asyncPopulateUsersAndThreads;
