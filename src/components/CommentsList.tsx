import { useAppSelector } from "../states/hooks";
import CommentItem from "./CommentItem";
import { Comment } from "../utils/api";

const CommentsList = () => {
  const threadDetail = useAppSelector((state) => state.threadDetail);
  const { comments, id }: { comments: Comment[]; id: string } = threadDetail || { comments: [], id: "" };

  return (
    <div className="pt-2">
      <h3 className="text-xl font-semibold mb-2">Comment ({comments.length})</h3>
      {comments.map((comment: Comment) => (
        <CommentItem key={comment.id} comment={comment} threadId={id} />
      ))}
    </div>
  );
};

export default CommentsList;
