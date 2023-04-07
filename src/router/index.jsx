import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import UserCenter from "../pages/UserCenter";
import Profile from "../pages/Settings/Profile";
import Account from "../pages/Settings/Account";
import NotFound from "../pages/NotFound";

const CommonRoutes = [
  {
    path: "/",
    element: <Navigate to="home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const AuthRoutes = [
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
        element: <Account />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default localStorage.getItem("token")
  ? [...CommonRoutes, ...AuthRoutes]
  : CommonRoutes;
