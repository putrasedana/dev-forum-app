import { ActionType } from "./action.js";
import { User } from "../../utils/api.js";

interface Action {
  type: string;
  payload?: {
    authUser: User | null;
  };
  [extraProps: string]: unknown;
}

function authUserReducer(authUser: User | null = null, action: Action = {} as Action) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload!.authUser;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;
