import api, { User } from "../../utils/api";
import { showError, showSuccess } from "../../utils/alert";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users: User[]) {
  return { type: ActionType.RECEIVE_USERS, payload: { users } };
}

function asyncRegisterUser({ name, email, password }: { name: string; email: string; password: string }) {
  return async () => {
    try {
      const response = await api.register({ name, email, password });
      showSuccess("Account created successfully!");
      return response;
    } catch (error) {
      showError((error as Error).message);
      throw error;
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
