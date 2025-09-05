import React, { useState } from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
          <MainContent />
        </div>

      </div>
    </Router>
  );
};

const root = document.getElementById("react-root");
if (root) {
  ReactDOM.render(<App />, root);
}