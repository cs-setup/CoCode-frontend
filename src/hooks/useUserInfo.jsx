import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUserInfo = () => {
  const { userInfo } = useContext(UserContext);
  if (!userInfo) {
    return;
  }
  return userInfo;
};

export default useUserInfo;
