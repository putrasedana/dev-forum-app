import { useAppDispatch } from "../states/hooks";
import { useNavigate } from "react-router-dom";
import { asyncCreateThread } from "../states/threads/action";
import AddThreadInput from "../components/AddThreadInput";

type ThreadInput = {
  title: string;
  body: string;
  category: string;
};

const AddThreadPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onAdd = (thread: ThreadInput): void => {
    dispatch(asyncCreateThread(thread));
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-4">Create a New Thread</h2>
      <AddThreadInput onAddThread={onAdd} />
    </div>
  );
};
export default AddThreadPage;
