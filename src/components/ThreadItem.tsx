import { FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../states/hooks";
import { postedAt, renderBody } from "../utils";
import { asyncDownVoteThread, asyncNeutralizeThreadVote, asyncUpVoteThread } from "../states/votes/action";
import VotesBtn from "./VotesBtn";
import { showError } from "../utils/alert";

type Owner = {
  id: string;
  name: string;
  avatar?: string;
};

type ThreadItemProps = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
};

const ThreadItem = ({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
}: ThreadItemProps) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);

  const MAX_BODY_LENGTH = 260;

  const trimmedBody = body.length > MAX_BODY_LENGTH ? `${body.substring(0, MAX_BODY_LENGTH)}...` : body;

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpVote = () => {
    if (!authUser) {
      showError("You need to log in first to vote.");
      return;
    }
    if (hasUpVoted) {
      dispatch(asyncNeutralizeThreadVote(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      showError("You need to log in first to vote.");
      return;
    }
    if (hasDownVoted) {
      dispatch(asyncNeutralizeThreadVote(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <div data-testid="thread-item" className="border-b border-gray-700 pb-4 space-y-5">
      <div className="space-y-4">
        <span className="border px-2 rounded-md text-xs sm:text-sm py-1 text-gray-400 border-gray-700">
          <span>#</span>
          {category}
        </span>
        <h3 className="text-xl sm:text-2xl font-semibold text-indigo-400 hover:underline">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h3>
      </div>

      <div className="text-sm sm:text-base text-gray-300">{renderBody(trimmedBody)}</div>

      <div className="flex items-center space-x-6 text-sm sm:justify-normal sm:text-base lg:text-lg text-gray-400">
        <VotesBtn
          handleClick={handleUpVote}
          count={upVotesBy.length}
          hasVoted={hasUpVoted}
          icon={FaThumbsUp}
          votedColor="text-green-400"
        />
        <VotesBtn
          handleClick={handleDownVote}
          count={downVotesBy.length}
          hasVoted={hasDownVoted}
          icon={FaThumbsDown}
          votedColor="text-red-400"
        />

        <div className="flex items-center">
          <FaComment />
          <span className="ml-1 text-sm sm:text-base">{totalComments}</span>
        </div>

        <div className="flex items-center gap-1 text-base">
          <img src={owner.avatar} alt={owner.name} className="w-6 h-6 rounded-full" />
          <span className="text-sm sm:text-base text-gray-400">{owner.name}</span>
        </div>

        <p className="text-sm sm:text-base">{postedAt(createdAt)}</p>
      </div>
    </div>
  );
};

export default ThreadItem;
