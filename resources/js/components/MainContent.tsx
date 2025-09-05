import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersPage from "../pages/UsersPage";

const MainContent: React.FC = () => {
    return (
        <main className="flex-1 pt-16 sm:ml-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Switch>
                    <Route path="/users" component={UsersPage}></Route>
                    <Route path="/" exact>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
                            <p className="mt-2 text-gray-600">Select an option from the menu.</p>
                        </div>
                    </Route>
                </Switch>
            </div>
        </main>
    );
};

export default MainContent;