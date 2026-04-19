import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../states/hooks";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { asyncReceiveThreadDetail, clearThreadDetail } from "../states/threadDetail/action";
import { postedAt, renderBody } from "../utils";
import CommentInput from "../components/CommentInput";
import CommentsList from "../components/CommentsList";
import { asyncDownVoteThread, asyncNeutralizeThreadVote, asyncUpVoteThread } from "../states/votes/action";
import VotesBtn from "../components/VotesBtn";
import DetailThreadSkeleton from "../components/DetailThreadSkeleton";
import { showError } from "../utils/alert";

const DetailThreadPage = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const dispatch = useAppDispatch();

  const threadDetail = useAppSelector((state) => state.threadDetail);
  const authUser = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (!threadId) return;
    dispatch(asyncReceiveThreadDetail(threadId));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, threadId]);

  if (!threadDetail) return <DetailThreadSkeleton />;

  const { id, title, body, category, createdAt, owner, upVotesBy = [], downVotesBy = [] } = threadDetail;

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpVote = () => {
    if (!authUser) return showError("You need to log in first to vote.");

    dispatch(hasUpVoted ? asyncNeutralizeThreadVote(id) : asyncUpVoteThread(id));
  };

  const handleDownVote = () => {
    if (!authUser) return showError("You need to log in first to vote.");

    dispatch(hasDownVoted ? asyncNeutralizeThreadVote(id) : asyncDownVoteThread(id));
  };

  return (
    <div className="space-y-6 sm:mb-20">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block text-sm px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
          #{category}
        </span>

        <h1 className="text-3xl font-bold text-gray-100 leading-snug">{title}</h1>
      </div>

      {/* Body */}
      <div className="text-gray-300 leading-relaxed text-base">{renderBody(body)}</div>

      {/* Meta + Votes */}
      <div className="flex flex-wrap items-center space-x-6 text-gray-400 border-t border-gray-700 pt-6">
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

        <div className="flex items-center gap-1 text-base">
          <img src={owner.avatar} alt={owner.name} className="w-6 h-6 rounded-full" />
          <span className="font-medium text-gray-400">{owner.name}</span>
        </div>

        <p className="text-base">{postedAt(createdAt)}</p>
      </div>

      <CommentInput threadId={id} />

      <CommentsList />
    </div>
  );
};

export default DetailThreadPage;
