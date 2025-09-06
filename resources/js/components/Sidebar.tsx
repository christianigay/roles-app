import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const handleLogout = () => {
    closeSidebar();
  };

  return (
    <div
      className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static transition-transform duration-300 ease-in-out z-30`}
    >
      <div className="flex items-center justify-between px-4">
				<h2 className="text-xl font-bold">Menu</h2>
        <button
          onClick={closeSidebar}
          className="md:hidden text-white hover:text-gray-200"
          aria-label="Close sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
			
      <nav className="mt-6">
        <Link
          to="/users"
          className="flex items-center gap-3 mt-6 py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors data-[active=true]:bg-blue-700"
          onClick={closeSidebar}
          aria-label="Users"
        >
          <svg
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
          Users
        </Link>
        
      </nav>
    </div>
  );
};

export default Sidebar;