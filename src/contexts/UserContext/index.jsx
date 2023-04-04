import { createContext, useState, useEffect } from "react";
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

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchUserInfo();
      setUserInfo(result);
    };
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
