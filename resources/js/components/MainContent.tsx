import React from "react";
import { Switch, Route } from "react-router-dom";
import { appRoutes } from "../routes/appRoutes";

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <Switch>
        
        {appRoutes.map(({ path, exact, component: Component }) => (
          <Route key={path} path={path} exact={exact} component={Component} />
        ))}

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