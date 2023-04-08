import { createContext, useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import { fetchUserInfo } from "../../utils/api/user";

export const UserContext = createContext({
  userInfo: {
    user: { nickname: "", avatar: "", id: "" },
  },
  setUserInfo: () => {},
  setUpdateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    user: { nickname: "", avatar: "", id: "" },
  });

  const [updateUser, setUpdateUser] = useState(false);
  const isLogin = useLogin();
  const getUserInfo = async () => {
    const result = await fetchUserInfo();
    setUserInfo(result);
    setUpdateUser(false);
  };

  useEffect(() => {
    getUserInfo();
  }, [isLogin, updateUser]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, setUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};
