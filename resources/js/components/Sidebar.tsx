import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, closeSidebar}) => {
    return (
        <div className={`${isOpen ? "translate-x-0" : "translate-x-full"} sm:translate-x-0 fixed sm:static inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-20 pt-16 sm:pt-0`}>
            <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <div className="mt-5">
                    <Link 
                    to="/users"
                    onClick={closeSidebar}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
                        Users
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;