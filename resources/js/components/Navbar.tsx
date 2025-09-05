import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
    toggleSidebar: () => void;
    sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, sidebarOpen}) => {
    return (
        <nav className="bg-white shadow-sm fixed w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* <div className="flex">
                        <div className="flex-shirink-0 flex items-center">
                            <span className="text-2xl font-bold text-gray-800">Logo</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link 
                            to="/users"
                            className="border-b-2 border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 px-1 pt-1 text-sm font-medium transition-colors">
                                Users
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;