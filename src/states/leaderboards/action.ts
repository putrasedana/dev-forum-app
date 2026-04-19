import { showError } from "../../utils/alert.js";
import api, { Leaderboard } from "../../utils/api.js";
import type { AppDispatch } from "../index.js";

const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

function receiveLeaderboardsActionCreator(leaderboards: Leaderboard[]) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncFetchLeaderboards() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(response));
    } catch (error) {
      showError((error as Error).message);
    }
  };
}

export { ActionType, receiveLeaderboardsActionCreator, asyncFetchLeaderboards };
