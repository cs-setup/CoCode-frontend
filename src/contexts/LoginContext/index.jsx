import { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../../utils/api/user";

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: {
    user: { nickname: "", avatar: "" },
  },
  setUserInfo: () => {},
});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchUserInfo();
      setUserInfo(result);
    };
    getUserInfo();
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </LoginContext.Provider>
  );
};
