import { ActionType } from "./action.js";

interface Action {
  type: string;
  payload?: {
    isPreload: boolean;
  };
  [extraProps: string]: unknown;
}

function isPreloadReducer(isPreload: boolean = true, action: Action = {} as Action) {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload!.isPreload;
    default:
      return isPreload;
  }
}

export default isPreloadReducer;
