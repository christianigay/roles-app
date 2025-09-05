import React from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage"
const App: React.FC = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/users" className="text-blue-500 hover:underline">Users</Link>
        </nav>

        <Switch>
          <Route path="/users" component={UsersPage}/>
        </Switch>
      </div>
    </Router>
  );
};

const root = document.getElementById("react-root");
if (root) {
  ReactDOM.render(<App />, root);
}