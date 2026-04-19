import { ActionType } from "./action.js";
import { Leaderboard } from "../../utils/api.js";

interface Action {
  type: string;
  payload?: {
    leaderboards: Leaderboard[];
  };
  [extraProps: string]: unknown;
}

function leaderboardsReducer(leaderboards: Leaderboard[] = [], action: Action = {} as Action) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload!.leaderboards;

    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
