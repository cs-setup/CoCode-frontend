import { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../../utils/api/user";

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
