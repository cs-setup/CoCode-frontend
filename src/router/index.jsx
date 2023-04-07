import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import UserCenter from "../pages/UserCenter";
import Profile from "../pages/Settings/Profile";
import Accout from "../pages/Settings/Account";

const routes = [
  {
    path: "/",
    element: <Navigate to="home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user",
    element: <UserCenter />,
  },
  {
    path: "/user/settings",
    element: <Outlet />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "account",
        element: <Accout />,
      },
    ],
  },
];

export default routes;
