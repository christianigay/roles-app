import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import UserAddPage from "../pages/UserAddPage";
import UserEditPage from "../pages/UserEditPage";

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <Switch>
        <Route path="/users" component={UsersPage} />
        <Route path="/user/add" component={UserAddPage} />
         <Route path="/user/edit/:id" exact component={UserEditPage} />

        <Route path="/" exact>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
            <p className="mt-2 text-gray-600">Select an option from the menu.</p>
          </div>
        </Route>
      </Switch>
    </main>
  );
};

export default MainContent;