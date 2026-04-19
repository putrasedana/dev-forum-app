import useInput from "../hooks/useInput";
import { useAppSelector } from "../states/hooks";
import { showError } from "../utils/alert";

type AddThreadInputProps = {
  onAddThread: (thread: { title: string; body: string; category: string }) => void;
};

const AddThreadInput = ({ onAddThread }: AddThreadInputProps) => {
  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const authUser = useAppSelector((state) => state.authUser);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authUser) {
      showError("You need to log in first to create a thread.");
      return;
    }

    onAddThread({ title, body, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        id="title"
        value={title}
        onChange={onTitleChange}
        placeholder="Title"
        className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
        required
      />

      <input
        type="text"
        id="category"
        value={category}
        onChange={onCategoryChange}
        placeholder="Category"
        className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
        required
      />

      <textarea
        id="body"
        value={body}
        placeholder="What's on your mind?"
        onChange={onBodyChange}
        className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
        rows={4}
        required
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
      >
        Create Thread
      </button>
    </form>
  );
};

export default AddThreadInput;
