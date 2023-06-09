import { createContext, useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import { fetchUserInfo } from "../../utils/api/user";

export const UserContext = createContext({
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {
    user: { nickname: "", avatar: "", id: "" },
  },
  setUserInfo: () => {},
  setUpdateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {
      user: { nickname: "", avatar: "", id: "" },
    }
  );

  // 信息修改后手动通知更新
  const [updateUser, setUpdateUser] = useState(false);

  // 登录状态变化后通知更新
  const isLogin = useLogin();

  const getUserInfo = async () => {
    const result = await fetchUserInfo({ id: null });
    if (result) {
      setUserInfo(result);
      localStorage.setItem("userInfo", JSON.stringify(result));
    }
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
