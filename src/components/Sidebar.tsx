import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTrophy, FaSignInAlt, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { IconType } from "react-icons";
import { User } from "../utils/api";

type SidebarProps = {
  authUser: User | null;
  signOut: () => void;
};

type NavItem = {
  to: string;
  icon: IconType;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/", icon: FaHome, label: "Threads" },
  { to: "/leaderboards", icon: FaTrophy, label: "Leaderboards" },
  { to: "/new", icon: FaPlus, label: "New Thread" },
];

const Sidebar = ({ authUser, signOut }: SidebarProps) => {
  const location = useLocation();

  const navItemClass = (path: string) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
     hover:bg-gray-800 font-semibold ${location.pathname === path ? "bg-gray-800" : "text-gray-400"}`;

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col py-8 lg:pl-6 sticky top-0 h-screen">
      <div className="space-y-2 mb-2">
        <h1 className="text-2xl font-bold px-4 mb-6">
          <Link to="/">Dev Forum</Link>
        </h1>

        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className={navItemClass(to)}>
            <Icon className="text-xl" />
            <span className="text-lg">{label}</span>
          </Link>
        ))}
      </div>

      <div className="space-y-2">
        {authUser ? (
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 w-full text-left font-semibold text-gray-400"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="text-lg">Logout</span>
          </button>
        ) : (
          <Link to="/login" className={navItemClass("/login")}>
            <FaSignInAlt className="text-xl" />
            <span className="text-lg">Login</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
