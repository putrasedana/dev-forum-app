import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTrophy, FaSignInAlt, FaSignOutAlt, FaPlus, FaTimes } from "react-icons/fa";
import { User } from "../utils/api";

type MobileSidebarProps = {
  authUser: User | null;
  signOut: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ authUser, signOut, isOpen, onClose }: MobileSidebarProps) => {
  const location = useLocation();

  const navItemClass = (path: string) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
     hover:bg-gray-800 font-semibold ${location.pathname === path ? "bg-gray-800" : "text-gray-400"}`;

  const handleNavClick = () => onClose();

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white flex flex-col p-6 z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dev Forum</h1>
          <button title="menu" type="button" onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="space-y-2 flex-1">
          <Link to="/" className={navItemClass("/")} onClick={handleNavClick}>
            <FaHome className="text-xl" />
            <span className="text-lg">Threads</span>
          </Link>

          <Link to="/leaderboards" className={navItemClass("/leaderboards")} onClick={handleNavClick}>
            <FaTrophy className="text-xl" />
            <span className="text-lg">Leaderboards</span>
          </Link>

          <Link to="/new" className={navItemClass("/new")} onClick={handleNavClick}>
            <FaPlus className="text-xl" />
            <span className="text-lg">New Thread</span>
          </Link>

          <div className="space-y-2">
            {authUser ? (
              <button
                type="button"
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-gray-800 w-full text-left font-semibold text-gray-400"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="text-lg">Logout</span>
              </button>
            ) : (
              <Link to="/login" className={navItemClass("/login")} onClick={handleNavClick}>
                <FaSignInAlt className="text-xl" />
                <span className="text-lg">Login</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
