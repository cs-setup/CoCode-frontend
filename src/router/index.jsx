import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import UserCenter from "../pages/UserCenter";
import Profile from "../pages/Settings/Profile";
import Account from "../pages/Settings/Account";
import Notes from "../pages/Notes";
import Editor from "../pages/Editor";

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
    path: "/notes",
    element: <Notes />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const useRouter = () => {
  const isLogin = useLogin();

  return isLogin ? [...CommonRoutes, ...AuthRoutes] : CommonRoutes;
};

export default useRouter;
