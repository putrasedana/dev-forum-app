import { Thread, User } from "../utils/api";
import ThreadItem from "./ThreadItem";
import ThreadsSkeleton from "./ThreadsSkeleton";

type ThreadWithUser = Thread & { user: User };

type ThreadsListProps = {
  threads: ThreadWithUser[];
};

const ThreadsList = ({ threads }: ThreadsListProps) => {
  if (threads.length === 0) return <ThreadsSkeleton />;

  return (
    <div className="space-y-10">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          owner={thread.user}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
        />
      ))}
    </div>
  );
};

export default ThreadsList;
