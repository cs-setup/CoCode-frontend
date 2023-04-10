import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const NotFound = React.lazy(()=> import("../pages/NotFound"))
const Home = React.lazy(()=> import("../pages/Home"))
const UserCenter = React.lazy(()=> import("../pages/UserCenter"))
const Profile = React.lazy(()=> import("../pages/Settings/Profile"))
const Account = React.lazy(()=> import("../pages/Settings/Account"))
const Notes = React.lazy(()=> import("../pages/Notes"))
const Editor = React.lazy(()=> import("../pages/Editor"))


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
