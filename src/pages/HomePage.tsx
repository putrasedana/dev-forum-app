import { useEffect } from "react";
import ThreadsList from "../components/ThreadsList";
import asyncPopulateUsersAndThreads from "../states/shared/action";
import { useAppDispatch, useAppSelector } from "../states/hooks";
import { Thread, User } from "../utils/api";

type HomePageProps = {
  selectedCategories: string[];
};

type ThreadWithUser = Thread & { user: User };

const HomePage = ({ selectedCategories }: HomePageProps) => {
  const dispatch = useAppDispatch();

  const threads = useAppSelector((state) => state.threads);
  const users = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
    }))
    .filter((thread): thread is ThreadWithUser => thread.user !== undefined);

  const filteredThreads =
    selectedCategories.length > 0
      ? threadList.filter((thread) => selectedCategories.includes(thread.category))
      : threadList;

  return (
    <div className="sm:mb-20">
      <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-4">Recent Threads</h2>
      <ThreadsList threads={filteredThreads} />
    </div>
  );
};

export default HomePage;
