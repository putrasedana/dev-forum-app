import { useAppDispatch, useAppSelector } from "../states/hooks";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { postedAt, renderBody } from "../utils/index";
import { asyncUpVoteComment, asyncDownVoteComment, asyncNeutralizeCommentVote } from "../states/votes/action";
import VotesBtn from "./VotesBtn";
import { Comment } from "../utils/api";
import { showError } from "../utils/alert";

interface CommentItemProps {
  comment: Comment;
  threadId: string;
}

const CommentItem = ({ comment, threadId }: CommentItemProps) => {
  const { owner, createdAt, content, upVotesBy, downVotesBy, id } = comment;
  const { avatar, name } = owner;
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpVote = () => {
    if (!authUser) {
      showError("You need to log in first to vote.");
      return;
    }
    if (hasUpVoted) {
      dispatch(asyncNeutralizeCommentVote(threadId, id));
    } else {
      dispatch(asyncUpVoteComment(threadId, id));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      showError("You need to log in first to vote.");
      return;
    }
    if (hasDownVoted) {
      dispatch(asyncNeutralizeCommentVote(threadId, id));
    } else {
      dispatch(asyncDownVoteComment(threadId, id));
    }
  };

  return (
    <div className="border-b border-gray-700 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={avatar} alt={`${name}'s avatar`} className="w-6 h-6 rounded-full" />
          <span className="font-semibold ml-1 text-gray-100">{name}</span>
        </div>
        <p className="text-gray-400">{postedAt(createdAt)}</p>
      </div>

      <div className="text-gray-300 leading-relaxed text-base">{renderBody(content)}</div>

      <div className="flex items-center space-x-4 text-gray-400">
        <VotesBtn
          handleClick={handleUpVote}
          count={upVotesBy.length}
          hasVoted={hasUpVoted}
          icon={FaThumbsUp}
          votedColor="text-green-500"
        />
        <VotesBtn
          handleClick={handleDownVote}
          count={downVotesBy.length}
          hasVoted={hasDownVoted}
          icon={FaThumbsDown}
          votedColor="text-red-500"
        />
      </div>
    </div>
  );
};

export default CommentItem;
