import UsersPage from "../pages/UsersPage";
import UserAddPage from "../pages/UserAddPage";
import UserEditPage from "../pages/UserEditPage";

interface AppRoute {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
}

export const appRoutes: AppRoute[] = [
  { path: "/users", component: UsersPage },
  { path: "/user/add", component: UserAddPage },
  { path: "/user/edit/:id", component: UserEditPage, exact: true },
];
