import { createContext, useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin"
import { fetchUserInfo } from "../../utils/api/user";

export const UserContext = createContext({
  userInfo: {
    user: { nickname: "", avatar: "", id: "" },
  },
  setUserInfo: () => {},
});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    user: { nickname: "", avatar: "", id: ""  },
  });
  const isLogin = useLogin()

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchUserInfo();
      setUserInfo(result);
    };
    getUserInfo();
  }, [isLogin]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
