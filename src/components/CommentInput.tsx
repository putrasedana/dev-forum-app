import { useAppDispatch, useAppSelector } from "../states/hooks";
import useInput from "../hooks/useInput";
import { asyncCreateComment } from "../states/threadDetail/action";
import { showError } from "../utils/alert";

type CommentInputProps = {
  threadId: string;
};

const CommentInput = ({ threadId }: CommentInputProps) => {
  const [comment, onChange, setComment] = useInput("");
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authUser) {
      showError("You need to log in first to submit a comment.");
      return;
    }

    dispatch(asyncCreateComment(threadId, comment));
    setComment("");
  };

  return (
    <div className="pt-6 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-gray-100">Add Comment</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={comment}
          onChange={onChange}
          rows={4}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write your comment..."
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition font-medium"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
