import { useAppSelector } from "../states/hooks";
import LeaderBoardsList from "../components/LeaderBoardsList";

const LeaderBoardsPage = () => {
  const authUser = useAppSelector((state) => state.authUser);

  return (
    <div className="sm:mb-20">
      <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-4 ">Active User Leaderboards</h2>
      <LeaderBoardsList authUser={authUser} />
    </div>
  );
};

export default LeaderBoardsPage;
