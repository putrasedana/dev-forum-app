import { ActionType } from "./action.js";
import { User } from "../../utils/api.js";

interface Action {
  type: string;
  payload?: {
    users: User[];
  };
  [extraProps: string]: unknown;
}

function usersReducer(users: User[] = [], action: Action = {} as Action) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload!.users;
    default:
      return users;
  }
}

export default usersReducer;
