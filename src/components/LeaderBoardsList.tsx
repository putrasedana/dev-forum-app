import { useAppDispatch, useAppSelector } from "../states/hooks";
import { useEffect } from "react";
import { User } from "../utils/api";
import LeaderBoardItem from "./LeaderBoardItem";
import LeaderBoardsSkeleton from "./LeaderBoardsSkeleton";
import { asyncFetchLeaderboards } from "../states/leaderboards/action";

type LeaderBoardsListProps = {
  authUser: User | null;
};

const LeaderBoardsList = ({ authUser }: LeaderBoardsListProps) => {
  const dispatch = useAppDispatch();
  const leaderboards = useAppSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  if (leaderboards.length === 0) return <LeaderBoardsSkeleton />;

  return (
    <>
      <div className="flex justify-between mb-3 sm:text-xl font-semibold">
        <h4>Users</h4>
        <h4>Scores</h4>
      </div>
      <div className="space-y-2">
        {leaderboards.map(({ user, score }) => (
          <LeaderBoardItem key={user.id} user={user} score={score} authUser={authUser} />
        ))}
      </div>
    </>
  );
};

export default LeaderBoardsList;
