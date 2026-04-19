import { User } from "../utils/api";

type LeaderBoardItemProps = {
  user: User;
  score: number;
  authUser: User | null;
};

const LeaderBoardItem = ({ user, score, authUser }: LeaderBoardItemProps) => {
  return (
    <div className="flex justify-between items-center py-6 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <img src={user.avatar} alt={`${user.name}'s avatar`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
        <p className="text-xl">
          {authUser?.id === user.id ? (
            <>
              {user.name} <span className="italic font-normal">(You)</span>
            </>
          ) : (
            user.name
          )}
        </p>
      </div>
      <p className="text-xl">{score}</p>
    </div>
  );
};

export default LeaderBoardItem;
