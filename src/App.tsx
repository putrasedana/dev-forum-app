import { useAppDispatch, useAppSelector } from "./states/hooks";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailThreadPage from "./pages/DetailThreadPage";
import Sidebar from "./components/Sidebar";
import LeaderBoardsPage from "./pages/LeaderBoardsPage";
import AddThreadPage from "./pages/AddThreadPage";
import NotFoundPage from "./pages/NotFoundPage";
import Categories from "./components/Categories";
import Spinner from "./components/Spinner";
import ScrollToTop from "./components/ScrollToTop";
import MobileSidebar from "./components/MobileSidebar";
import { FaBars } from "react-icons/fa";

const App = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);
  const threads = useAppSelector((state) => state.threads);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = [...new Set(threads.map((thread) => thread.category))];

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  if (isPreload) {
    return <Spinner size={80} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center">
      <div className="flex w-full max-w-7xl gap-6 h-full">
        {/* Left Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar authUser={authUser} signOut={onSignOut} />
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-gray-900 p-6 md:p-10 text-gray-100 border-x border-gray-700">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4 gap-4 mb-10 lg:hidden">
            <h1 className="text-xl font-bold text-white">Dev Forum</h1>
            <button
              title="close menu"
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>

          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage selectedCategories={selectedCategories} />} />
            <Route path="/new" element={<AddThreadPage />} />
            <Route path="/threads/:threadId" element={<DetailThreadPage />} />
            <Route path="/leaderboards" element={<LeaderBoardsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Right Sidebar - hidden on mobile */}
        <div className="hidden xl:block">
          <Categories
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        authUser={authUser}
        signOut={onSignOut}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </div>
  );
};

export default App;
