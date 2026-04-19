import api, { User } from "../../utils/api";
import type { AppDispatch } from "../index";
import { showError, showSuccess } from "../../utils/alert";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser: User | null) {
  return { type: ActionType.SET_AUTH_USER, payload: { authUser } };
}

function unsetAuthUserActionCreator() {
  return { type: ActionType.UNSET_AUTH_USER, payload: { authUser: null } };
}

function asyncSetAuthUser({ email, password }: { email: string; password: string }) {
  return async (dispatch: AppDispatch) => {
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      showSuccess("Welcome back!");
      return { success: true, user: authUser };
    } catch (error) {
      showError((error as Error).message);
      return Promise.reject(error);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: AppDispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
  };
}

export { ActionType, setAuthUserActionCreator, unsetAuthUserActionCreator, asyncSetAuthUser, asyncUnsetAuthUser };
